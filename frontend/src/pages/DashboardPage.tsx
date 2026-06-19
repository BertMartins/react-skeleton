import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.brand}>⬡ Skeleton App</div>
        <div style={styles.userInfo}>
          <span style={styles.userName}>{user?.name}</span>
          <span style={styles.badge}>{user?.role}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>Sair</button>
        </div>
      </div>

      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.welcome}>Bem-vindo, {user?.name}! 👋</h2>
          <p style={styles.desc}>
            Você está autenticado com sucesso. Este é o ponto de partida do seu projeto.
          </p>
          <div style={styles.info}>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>E-mail</span>
              <span style={styles.infoValue}>{user?.email}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Perfil</span>
              <span style={styles.infoValue}>{user?.role}</span>
            </div>
          </div>
        </div>

        <div style={styles.hint}>
          <strong>Dica:</strong> A partir daqui adicione suas páginas e funcionalidades.
          O esqueleto já tem autenticação JWT, rota protegida e integração com a API.
        </div>
      </main>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#f9fafb', display: 'flex', flexDirection: 'column' },
  header: {
    background: '#fff',
    borderBottom: '1px solid #e5e7eb',
    padding: '0 2rem',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: { fontWeight: 700, fontSize: '1.2rem', color: '#2563eb' },
  userInfo: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  userName: { fontWeight: 500, color: '#374151' },
  badge: {
    background: '#eff6ff', color: '#2563eb',
    borderRadius: 20, padding: '0.2rem 0.65rem',
    fontSize: '0.8rem', fontWeight: 600,
  },
  logoutBtn: {
    background: '#f3f4f6', color: '#374151',
    padding: '0.4rem 0.9rem', borderRadius: 8, fontSize: '0.875rem', fontWeight: 500,
  },
  main: { maxWidth: 640, margin: '3rem auto', padding: '0 1.5rem', width: '100%' },
  card: {
    background: '#fff', borderRadius: 16, padding: '2rem',
    boxShadow: '0 1px 3px rgba(0,0,0,.08)',
    marginBottom: '1.5rem',
  },
  welcome: { fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#111827' },
  desc: { color: '#6b7280', marginBottom: '1.5rem' },
  info: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  infoItem: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '0.75rem 1rem', background: '#f9fafb', borderRadius: 8,
  },
  infoLabel: { fontWeight: 500, color: '#6b7280', fontSize: '0.875rem' },
  infoValue: { color: '#111827', fontWeight: 500 },
  hint: {
    background: '#fffbeb', border: '1px solid #fde68a',
    color: '#92400e', borderRadius: 10, padding: '1rem 1.25rem',
    fontSize: '0.9rem', lineHeight: 1.6,
  },
}
