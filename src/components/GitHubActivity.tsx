import { useEffect, useState } from 'react';
import {
  GitCommit,
  GitPullRequest,
  Star,
  AlertCircle,
  Activity,
  ExternalLink,
  type LucideIcon,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useI18n } from '@/i18n/I18nContext';
import { useReveal } from '@/hooks/useReveal';

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string; url: string };
  created_at: string;
}

interface DisplayEvent {
  id: string;
  type: 'PushEvent' | 'PullRequestEvent' | 'IssuesEvent' | 'WatchEvent' | 'Other';
  label: string;
  repoName: string;
  repoUrl: string;
  time: string;
  Icon: LucideIcon;
}

const GITHUB_USER = 'guiguetz';
const API_URL = `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=10`;

const TYPE_MAP: Record<string, { pt: string; en: string; Icon: LucideIcon }> = {
  PushEvent: { pt: 'Push', en: 'Push', Icon: GitCommit },
  PullRequestEvent: { pt: 'Pull Request', en: 'Pull Request', Icon: GitPullRequest },
  IssuesEvent: { pt: 'Issue', en: 'Issue', Icon: AlertCircle },
  WatchEvent: { pt: 'Star', en: 'Star', Icon: Star },
};

function relativeTime(dateStr: string, locale: 'pt' | 'en'): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (locale === 'pt') {
    if (days > 0) return `há ${days} ${days === 1 ? 'dia' : 'dias'}`;
    if (hours > 0) return `há ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    if (minutes > 0) return `há ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
    return 'agora';
  }

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'now';
}

function mapEvent(event: GitHubEvent, locale: 'pt' | 'en'): DisplayEvent {
  const mapping = TYPE_MAP[event.type];
  if (mapping) {
    return {
      id: event.id,
      type: event.type as DisplayEvent['type'],
      label: mapping[locale],
      repoName: event.repo.name,
      repoUrl: `https://github.com/${event.repo.name}`,
      time: relativeTime(event.created_at, locale),
      Icon: mapping.Icon,
    };
  }
  return {
    id: event.id,
    type: 'Other',
    label: event.type.replace(/Event$/, ''),
    repoName: event.repo.name,
    repoUrl: `https://github.com/${event.repo.name}`,
    time: relativeTime(event.created_at, locale),
    Icon: Activity,
  };
}

function GitHubActivitySkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-xl bg-card p-3"
        >
          <Skeleton className="h-8 w-8 shrink-0 rounded-lg" />
          <div className="min-w-0 flex-1 space-y-1.5">
            <Skeleton className="h-3.5 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-3 w-12 shrink-0" />
        </div>
      ))}
    </div>
  );
}

export function GitHubActivity() {
  const { t, locale } = useI18n();
  const { ref, shown } = useReveal<HTMLDivElement>();
  const [events, setEvents] = useState<DisplayEvent[]>([]);
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        return res.json() as Promise<GitHubEvent[]>;
      })
      .then((data) => {
        if (cancelled) return;
        const filtered = data.filter((e) => TYPE_MAP[e.type]).slice(0, 5);
        setEvents(filtered.map((e) => mapEvent(e, locale)));
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return (
    <section id="github-activity" className="mb-20">
      <div
        ref={ref}
        className={`panel rounded-2xl p-5 ${shown ? 'reveal-shown' : ''}`}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
              <Activity className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-sm font-semibold">{t.githubActivity.title}</h2>
              <p className="text-xs text-muted-foreground">
                @{GITHUB_USER}
              </p>
            </div>
          </div>
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.githubActivity.viewProfile}
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {status === 'loading' && <GitHubActivitySkeleton />}

        {status === 'error' && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            {t.githubActivity.error}
          </p>
        )}

        {status === 'ready' && events.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            {t.githubActivity.empty}
          </p>
        )}

        {status === 'ready' && events.length > 0 && (
          <ul className="space-y-1.5">
            {events.map((event) => (
              <li key={event.id}>
                <a
                  href={event.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                    <event.Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {event.label}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {event.repoName}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {event.time}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
