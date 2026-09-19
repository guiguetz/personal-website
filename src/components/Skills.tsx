import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend } from 'recharts';

const skillsData = [
  { name: 'HTML5', value: 95 },
  { name: 'CSS3', value: 90 },
  { name: 'JavaScript', value: 85 },
  { name: 'React', value: 85 },
  { name: 'TypeScript', value: 80 },
  { name: 'Node.js', value: 70 },
  { name: 'Git', value: 90 },
  { name: 'GitHub', value: 88 },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-white animate-fade-in-up">
          Habilidades
        </h2>
        <div className="relative h-[500px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <RadarChart
              width={300}
              height={300}
              data={skillsData}
              className="animate-fade-in-up"
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
            </RadarChart>
          </div>
          
          {/* Skill labels around the chart */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {skillsData.map((skill, index) => {
              const angle = (index * 360) / skillsData.length;
              const radius = 140; // distance from center
              const radian = (angle * Math.PI) / 180;
              const x = radius * Math.cos(radian - Math.PI / 2);
              const y = radius * Math.sin(radian - Math.PI / 2);
              
              return (
                <div
                  key={skill.name}
                  className="absolute flex items-center justify-center text-xs font-medium text-primary/80"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {skill.name}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Skill details below */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((skill, index) => (
            <div
              key={index}
              className="relative bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex flex-col items-center space-y-2 animate-fade-in-up delay-[{index * 100}ms]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg text-primary">
                {/* Icons would go here if we wanted to keep them */}
                <span className="text-sm">{skill.name.slice(0, 2)}</span>
              </div>
              <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
              <div className="w-full bg-gray-700/50 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${skill.value}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400 text-center">{skill.value}%</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}