import { StrictMode, Component } from 'react'
import type { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: any) {
    console.error('Uncaught Error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('shotbyivis_categories');
      localStorage.removeItem('shotbyivis_site_config');
    } catch {}
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050508] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-3xl bg-[#0c0c12] border border-white/15 shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#ff007f]/20 border border-[#ff007f] flex items-center justify-center text-[#ff007f] mx-auto">
              ⚡
            </div>
            <h1 className="text-2xl font-black font-heading uppercase">ShotByIvis Portal Recovery</h1>
            <p className="text-xs text-white/70">A temporary display error occurred. Click below to refresh and restore full site functionality.</p>
            <button
              onClick={this.handleReset}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white font-extrabold text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-all"
            >
              🔄 Refresh & Restore Website
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
