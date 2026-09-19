import { Code, Brush, Terminal, Box, Type, Server, GitBranch, Github } from 'lucide-react';

const skills = [
  { name: 'HTML5', icon: Code, percentage: 95 },
  { name: 'CSS3', icon: Brush, percentage: 90 },
  { name: 'JavaScript', icon: Terminal, percentage: 85 },
  { name: 'React', icon: Box, percentage: 85 },
  { name: 'TypeScript', icon: Type, percentage: 80 },
  { name: 'Node.js', icon: Server, percentage: 70 },
  { name: 'Git', icon: GitBranch, percentage: 90 },
  { name: 'GitHub', icon: Github, percentage: 88 },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-white animate-fade-in-up">
          Habilidades
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="relative bg-gray-800/50 p-6 rounded-lg border border-gray-700 flex flex-col items-center space-y-4 animate-fade-in-up delay-[{index * 100}ms]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg text-primary">
                <skill.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
              <div className="w-full bg-gray-700/50 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${skill.percentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400 text-center">{skill.percentage}%</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}