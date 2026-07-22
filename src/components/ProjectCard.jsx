import { Link } from "react-router-dom";

export default function ProjectCard({ project, index }) {
  const isEven = index % 2 === 0;

  return (
    <div 
      className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 py-12 lg:py-20 border-b border-neutral-200 dark:border-neutral-800 last:border-0 ${
        isEven ? "" : "lg:flex-row-reverse"
      }`}
    >
      {/* Visual Column */}
      <div className="w-full lg:w-3/5 overflow-hidden group rounded-sm border border-neutral-200 dark:border-neutral-800">
        <Link to={`/projects/${project.id}`}>
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Narrative Column */}
      <div className="w-full lg:w-2/5 space-y-6">
        <div className="flex items-center space-x-3 text-neutral-500 dark:text-neutral-400 font-mono text-xs uppercase tracking-widest">
          <span>{project.location}</span>
          <span>•</span>
          <span>{project.scale || project.builtUpArea}</span>
        </div>
        
        <h3 className="font-sans font-bold text-3xl md:text-4xl text-charcoal dark:text-white tracking-normal leading-tight">
          {project.title}
        </h3>
        
        <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base leading-relaxed font-light">
          {project.challenge}
        </p>

        <div className="pt-4 flex items-center space-x-6">
          <Link 
            to={`/projects/${project.id}`} 
            className="inline-block bg-brand-blue text-white hover:bg-gold hover:text-charcoal dark:bg-gold dark:text-charcoal dark:hover:bg-white dark:hover:text-charcoal transition-colors duration-300 font-mono text-xs uppercase tracking-widest px-6 py-3 font-semibold shadow-sm"
          >
            Examine Case Study
          </Link>
          <span className="text-neutral-500 dark:text-neutral-400 font-mono text-xs">{project.builtUpArea}</span>
        </div>
      </div>
    </div>
  );
}

