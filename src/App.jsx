import { useState, useMemo } from 'react'
import './App.css'

const screenData = [
  { id: 1, screenName: "Login / Organisation Resolver", category: "Access", purpose: "Authenticate user and route to correct org and role", keyFeatures: ["Email + password", "MFA", "Organisation resolver", "Organisation picker", "Role resolver", "Role picker", "Redirect to role-based landing"], primaryUsers: "All users", notes: "Uses User, Organisation, Role, Licence" },
  { id: 2, screenName: "SSO Login", category: "Access", purpose: "Enterprise authentication", keyFeatures: ["SSO button", "IdP redirect", "Org + role resolution"], primaryUsers: "Enterprise clients", notes: "Same routing logic" },
  { id: 3, screenName: "Password Reset", category: "Access", purpose: "Recover account access", keyFeatures: ["Email reset flow", "Token validation", "Password update"], primaryUsers: "All users", notes: "Security requirement" },
  { id: 4, screenName: "Sign Up / Create Organisation", category: "Onboarding", purpose: "Create organisation, licence, admin", keyFeatures: ["Persona selector", "Create organisation", "Create licence (modules, seats)", "Create admin user", "Assign Org Admin role", "Optional billing"], primaryUsers: "Org Admin", notes: "Birth of tenancy" },
  { id: 5, screenName: "User Profile & Preferences", category: "Settings", purpose: "Manage personal settings", keyFeatures: ["Profile info", "Password & MFA settings", "Notification preferences", "Timezone & locale"], primaryUsers: "All users", notes: "Per-user preferences" },
  { id: 6, screenName: "Org Admin – Users & Roles", category: "Admin", purpose: "Manage users and permissions", keyFeatures: ["User list", "Invite user", "Role assignment", "Seat usage indicator", "Deactivate/reactivate"], primaryUsers: "Org Admin", notes: "Seat enforcement" },
  { id: 7, screenName: "Org Settings", category: "Admin", purpose: "Configure organisation-level metadata", keyFeatures: ["Org details", "Default roles", "Branding (logo/name)", "Default notifications"], primaryUsers: "Org Admin", notes: "Tenant configuration" },
  { id: 8, screenName: "Licence & Seat Management", category: "Admin / Billing", purpose: "Manage modules and seats", keyFeatures: ["Licence tier", "Enabled modules", "Seat count & usage", "Upgrade/downgrade"], primaryUsers: "Org Admin, Finance", notes: "Drives access control" },
  { id: 9, screenName: "Billing & Payments", category: "Billing", purpose: "Manage payment details", keyFeatures: ["Payment method", "Invoices", "Billing history", "Receipts"], primaryUsers: "Org Admin, Finance", notes: "Stripe or equivalent" },
  { id: 10, screenName: "Billing & Usage Overview", category: "Billing", purpose: "View usage and fees", keyFeatures: ["Subscription summary", "Deal Intake events", "Post-Close fees", "Exports"], primaryUsers: "Org Admin", notes: "Mirrors pricing model" },
  { id: 11, screenName: "Portfolio Dashboard", category: "Core", purpose: "Portfolio-wide view of deals", keyFeatures: ["Global search", "Filters", "Quick stats widgets", "Lifecycle bands", "Company tiles"], primaryUsers: "Investors, Analysts, IC", notes: "Main landing" },
  { id: 12, screenName: "Origination Band", category: "Module 1", purpose: "Top-of-funnel screening", keyFeatures: ["Start Search tile", "Simple intake", "Watchlist tiles", "Promote to Pre-LOI"], primaryUsers: "Investors", notes: "Entry to billable flow" },
  { id: 13, screenName: "Target Search Intelligence", category: "Module 1", purpose: "Search targets via tech signals", keyFeatures: ["Keyword search", "Filters", "Tech Health Index", "Badges", "Provenance", "Expert Verified"], primaryUsers: "Investors, Analysts", notes: "Ontology-backed" },
  { id: 14, screenName: "Target Detail – Tech Assurance", category: "Module 1", purpose: "Inspect tech posture of target", keyFeatures: ["Signal breakdown", "Strengths/risks", "Public vs private signals", "AI reality check"], primaryUsers: "Investors", notes: "Converts to Deal" },
  { id: 15, screenName: "Watchlist", category: "Module 1", purpose: "Shortlist candidates", keyFeatures: ["Company tiles", "Last scanned", "Promote to Pre-LOI"], primaryUsers: "Investors", notes: "Pre-deal" },
  { id: 16, screenName: "Create Deal", category: "Core", purpose: "Initialize deal lifecycle", keyFeatures: ["Deal identity", "Investment thesis", "Evaluation criteria", "People & access", "Submit & generate deal"], primaryUsers: "Deal Leads", notes: "Initializes lifecycle" },
  { id: 17, screenName: "Deal Dashboard (Shell)", category: "Core", purpose: "Central hub per deal", keyFeatures: ["Deal header", "Stage chain", "Deal metrics", "Tabs", "Stage content panel"], primaryUsers: "Deal teams", notes: "Home view" },
  { id: 18, screenName: "Deal Overview Tab", category: "Core", purpose: "Snapshot of deal", keyFeatures: ["Business summary", "Deal type", "Timeline", "Status"], primaryUsers: "Deal teams", notes: "Read-mostly" },
  { id: 19, screenName: "Deal Parameters Tab", category: "Core", purpose: "Investment logic", keyFeatures: ["Thesis type", "Tech focus areas", "Target return", "Constraints"], primaryUsers: "Deal teams", notes: "Strategic reference" },
  { id: 20, screenName: "People & Access Tab", category: "Core", purpose: "Control deal access", keyFeatures: ["Deal team", "Advisors", "Target contacts", "Permissions"], primaryUsers: "Org Admin, Deal Lead", notes: "Access control" },
  { id: 21, screenName: "Documents Tab", category: "Core", purpose: "Central document repository", keyFeatures: ["Upload/download", "Folders", "Version history"], primaryUsers: "Deal teams", notes: "DD backbone" },
  { id: 22, screenName: "RFIs Tab", category: "Core", purpose: "Manage information requests", keyFeatures: ["Create RFI", "Assign owner", "Status tracking", "Due dates"], primaryUsers: "Deal + Target users", notes: "Critical to DD" },
  { id: 23, screenName: "Notes & Decisions Tab", category: "Core", purpose: "Governance & memory", keyFeatures: ["Internal notes", "IC decisions", "Milestones", "Sign-offs"], primaryUsers: "Deal teams, IC", notes: "Audit-grade" },
  { id: 24, screenName: "Deal Lifecycle Dashboard", category: "Lifecycle", purpose: "View all stages + history", keyFeatures: ["Stage timeline", "Current stage", "Assessment history", "Run Assessment"], primaryUsers: "Deal teams", notes: "Cross-module" },
  { id: 25, screenName: "Run Assessment Modal", category: "Lifecycle", purpose: "Configure and run assessment", keyFeatures: ["Stage context", "Scope", "Depth", "Notes", "Recipients"], primaryUsers: "Deal teams", notes: "Creates AssessmentRun" },
  { id: 26, screenName: "Notification Rules (Per Deal)", category: "Lifecycle", purpose: "Configure notifications", keyFeatures: ["Per-stage recipients", "Toggles for triggers"], primaryUsers: "Deal Lead", notes: "Drives email engine" },
  { id: 27, screenName: "Pre-LOI Risk Screening Band", category: "Module 2", purpose: "Early risk triage", keyFeatures: ["Risk badge", "Security/Compliance/Architecture checks", "Summary"], primaryUsers: "Investors", notes: "Intake fee trigger" },
  { id: 28, screenName: "Pre-LOI Risk Summary", category: "Module 2", purpose: "Detailed early findings", keyFeatures: ["Findings by domain", "Recommended actions"], primaryUsers: "Deal teams", notes: "Read-before-promote" },
  { id: 29, screenName: "Confirmatory Tech DD Band", category: "Module 3", purpose: "Track DD execution", keyFeatures: ["Progress snapshot", "Module indicators", "RFIs count"], primaryUsers: "DD teams", notes: "Intake fee" },
  { id: 30, screenName: "Confirmatory DD Workspace", category: "Module 3", purpose: "Execute full DD", keyFeatures: ["Module views", "Evidence coverage", "RFI mgmt", "Draft/final report"], primaryUsers: "DD teams", notes: "Heavy-work zone" },
  { id: 31, screenName: "Post-Implementation Plan Band", category: "Module 4", purpose: "Value creation planning", keyFeatures: ["Priority areas", "Expected outcomes", "Value plan status"], primaryUsers: "Integration teams", notes: "Post-close" },
  { id: 32, screenName: "Value Plan & Map View", category: "Module 4", purpose: "Roadmap to value", keyFeatures: ["Timeline", "Dependencies", "Value impact"], primaryUsers: "Integration teams", notes: "Planning only" },
  { id: 33, screenName: "Monitoring Band", category: "Module 5", purpose: "Ongoing oversight", keyFeatures: ["Risk changes", "Drift indicators", "Value progress"], primaryUsers: "Portfolio Ops", notes: "Recurring" },
  { id: 34, screenName: "Monitoring Report", category: "Module 5", purpose: "Periodic output", keyFeatures: ["Cycle summary", "Delta analysis", "Compliance updates"], primaryUsers: "Ops, IC", notes: "Exportable" },
  { id: 35, screenName: "Compliance Risk Monitoring", category: "Compliance", purpose: "Track regulatory posture", keyFeatures: ["Expiring controls", "Missing attestations"], primaryUsers: "Risk, Compliance", notes: "Long-term" },
  { id: 36, screenName: "Send for Review Modal", category: "Comms", purpose: "Share stage outputs", keyFeatures: ["To/CC", "Doc selection", "Templates", "Personal note"], primaryUsers: "Deal Leads", notes: "Writes to history" },
  { id: 37, screenName: "Email History", category: "Governance", purpose: "Audit trail of comms", keyFeatures: ["Timestamp", "Recipients", "Stage", "Doc version"], primaryUsers: "Admin, IC", notes: "Required for audits" },
  { id: 38, screenName: "In-App Notifications", category: "Comms", purpose: "Inform users inside platform", keyFeatures: ["Alerts", "Banners", "Status messages"], primaryUsers: "All users", notes: "Complements email" },
  { id: 39, screenName: "Audit Log", category: "Governance", purpose: "Track user/system actions", keyFeatures: ["Login history", "Changes", "Exports"], primaryUsers: "Admin, Compliance", notes: "Enterprise-grade" },
  { id: 40, screenName: "Error & Empty States", category: "System", purpose: "Handle edge cases", keyFeatures: ["No data views", "Error modals", "Retry actions"], primaryUsers: "All users", notes: "UX completeness" },
  { id: 41, screenName: "Onboarding / First-Time UX", category: "Onboarding", purpose: "Guide new users", keyFeatures: ["Tooltips", "Checklists", "Getting started"], primaryUsers: "New users", notes: "Reduces churn" },
  { id: 42, screenName: "Help & Documentation", category: "Support", purpose: "Self-serve support", keyFeatures: ["Docs links", "FAQs", "Support contact"], primaryUsers: "All users", notes: "Lightweight" },
  { id: 43, screenName: "Data Export Center", category: "System", purpose: "Export data & reports", keyFeatures: ["PDF/CSV exports", "Filtered exports"], primaryUsers: "Deal teams", notes: "Reporting" },
  { id: 44, screenName: "Session & Security Logs", category: "Security", purpose: "Session control & visibility", keyFeatures: ["Active sessions", "Logout all", "IP history"], primaryUsers: "Admin", notes: "Compliance-ready" },
  { id: 45, screenName: "System Status / Maintenance Page", category: "System", purpose: "Platform health", keyFeatures: ["Status banner", "Maintenance notices"], primaryUsers: "All users", notes: "Ops necessity" }
]

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedModule, setSelectedModule] = useState('all')
  const [expandedRow, setExpandedRow] = useState(null)

  const categories = useMemo(() => {
    const categorySet = new Set()
    screenData.forEach(screen => {
      if (screen.category) {
        categorySet.add(screen.category)
      }
    })
    return Array.from(categorySet).sort()
  }, [])

  const modules = useMemo(() => {
    const moduleSet = new Set()
    screenData.forEach(screen => {
      const match = screen.screenName.match(/Module (\d+)/)
      if (match) {
        moduleSet.add(match[1])
      }
      // Also check category for Module X
      if (screen.category && screen.category.startsWith('Module ')) {
        const catMatch = screen.category.match(/Module (\d+)/)
        if (catMatch) {
          moduleSet.add(catMatch[1])
        }
      }
    })
    return Array.from(moduleSet).sort()
  }, [])

  const filteredData = useMemo(() => {
    return screenData.filter(screen => {
      const matchesSearch = 
        screen.screenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        screen.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        screen.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
        screen.primaryUsers.toLowerCase().includes(searchTerm.toLowerCase()) ||
        screen.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        screen.keyFeatures.some(feature => 
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        )
      
      const matchesCategory = selectedCategory === 'all' || 
        screen.category === selectedCategory
      
      const matchesModule = selectedModule === 'all' || 
        screen.screenName.includes(`Module ${selectedModule}`) ||
        screen.category?.includes(`Module ${selectedModule}`)
      
      return matchesSearch && matchesCategory && matchesModule
    })
  }, [searchTerm, selectedCategory, selectedModule])

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>AlethiAI Screen Planning</h1>
        <p className="subtitle">Product screens and features overview</p>
      </header>

      <div className="controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search screens, features, users, or notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-container">
          <label htmlFor="category-filter">Filter by Category:</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="module-select"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="filter-container">
          <label htmlFor="module-filter">Filter by Module:</label>
          <select
            id="module-filter"
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="module-select"
          >
            <option value="all">All Modules</option>
            {modules.map(module => (
              <option key={module} value={module}>Module {module}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="screens-table">
          <thead>
            <tr>
              <th className="col-number">#</th>
              <th className="col-name">Screen Name</th>
              <th className="col-category">Category</th>
              <th className="col-purpose">Purpose</th>
              <th className="col-features">Key Features</th>
              <th className="col-users">Primary Users</th>
              <th className="col-notes">Notes / Dependencies</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((screen) => (
              <tr 
                key={screen.id} 
                className={expandedRow === screen.id ? 'expanded' : ''}
                onClick={() => toggleRow(screen.id)}
              >
                <td className="col-number">{screen.id}</td>
                <td className="col-name">{screen.screenName}</td>
                <td className="col-category">{screen.category}</td>
                <td className="col-purpose">{screen.purpose}</td>
                <td className="col-features">
                  <ul>
                    {screen.keyFeatures.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </td>
                <td className="col-users">{screen.primaryUsers}</td>
                <td className="col-notes">{screen.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <div className="no-results">
            <p>No screens match your search criteria.</p>
          </div>
        )}
      </div>

      <footer className="app-footer">
        <p>Total Screens: {filteredData.length} of {screenData.length}</p>
      </footer>
    </div>
  )
}

export default App
