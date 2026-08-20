import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import SetupPage from './pages/SetupPage'
import ReposPage from './pages/ReposPage'
import BackupPage from './pages/BackupPage'
import ArchivesPage from './pages/ArchivesPage'
import SettingsPage from './pages/SettingsPage'
import DocsPage from './pages/DocsPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/setup" replace />} />
        <Route path="/setup" element={<SetupPage />} />
        <Route path="/repos" element={<ReposPage />} />
        <Route path="/backup" element={<BackupPage />} />
        <Route path="/archives" element={<ArchivesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/docs" element={<DocsPage />} />
      </Routes>
    </Layout>
  )
}
