
import React from 'react';

type Props = {
  children: React.ReactNode;
};

type State = {
  error: any;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { error };
  }

  componentDidCatch(error: any, info: any) {
    console.error('UI Error', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 32, color: '#fff', background: '#1a1625', minHeight: '100vh' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <h1 style={{ fontSize: 32, marginBottom: 16, color: '#ff6b35' }}>
              🚨 앗, 화면 렌더링 중 오류가 발생했어요
            </h1>
            <p style={{ fontSize: 18, marginBottom: 24, color: '#ff5e9c' }}>
              브라우저 콘솔(F12)을 확인하거나 페이지를 새로고침해주세요.
            </p>
            <div style={{ 
              background: '#2d1b3d', 
              padding: 16, 
              borderRadius: 8, 
              border: '2px solid #ff6b35',
              overflow: 'auto'
            }}>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: 14, color: '#fbbf24' }}>
                {String(this.state.error?.stack || this.state.error)}
              </pre>
            </div>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: 24,
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #ff6b35 0%, #ff5e9c 100%)',
                color: 'white',
                border: 'none',
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🔄 페이지 새로고침
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
