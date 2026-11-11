import { Zap, TrendingUp, BarChart3, Lightbulb } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="text-primary" size={48} />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              PlugWise
            </h1>
          </div>
          <p className="text-xl text-gray-300 font-medium">
            Understand your energy. Control your costs.
          </p>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="card mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Electricity Consumption Calculator &amp; Scenario Simulator
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Calculate estimated electricity consumption and costs for your household appliances.
              Simulate different usage scenarios to understand potential savings.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary rounded-lg text-primary font-medium">
              <Lightbulb size={20} />
              <span>Phase 0: Foundation Complete</span>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="card hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart3 className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-white">Track Consumption</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Register appliances and calculate estimated energy consumption based on power
                ratings and usage patterns.
              </p>
            </div>

            <div className="card hover:border-accent/50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <TrendingUp className="text-accent" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-white">Estimate Costs</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Calculate estimated electricity costs using your configurable tariff. Visualize cost
                distribution across appliances.
              </p>
            </div>

            <div className="card hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Zap className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-white">What-if Simulator</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Simulate alternative usage scenarios without changing your baseline data. Compare
                and analyze potential savings.
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="card bg-gray-800/50">
            <h3 className="text-xl font-semibold mb-4 text-white">Technology Foundation</h3>
            <div className="flex flex-wrap gap-2">
              {[
                'React 19',
                'TypeScript 5.6',
                'Vite',
                'Tailwind CSS',
                'Lucide React',
                'Recharts',
                'Vitest',
                'Playwright',
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 border border-gray-700 rounded-lg bg-gray-800/30">
            <p className="text-sm text-gray-400 text-center">
              <strong className="text-gray-300">Note:</strong> All calculations provide estimates
              based on user-provided inputs. Actual consumption may vary based on appliance
              efficiency and usage patterns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
