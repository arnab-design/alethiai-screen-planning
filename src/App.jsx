import { useState, useMemo } from 'react'
import './App.css'

const screenData = [
  {
    id: 1,
    screenName: "Login / Organisation Resolver",
    purpose: "Authenticate users and route to correct org + role",
    keyFeatures: [
      "Email + password",
      "Optional MFA",
      "Organisation resolution",
      "Organisation picker (if multiple)",
      "Role resolution",
      "Role picker",
      "Redirect to role-based landing page"
    ],
    primaryUsers: "All users",
    notes: "Uses User, Organisation, Role, Licence models"
  },
  {
    id: 2,
    screenName: "SSO Login",
    purpose: "Enterprise authentication",
    keyFeatures: [
      "Use SSO button",
      "Redirect to IdP",
      "Org resolution",
      "Role resolution"
    ],
    primaryUsers: "Enterprise clients",
    notes: "Same flow post-auth as password login"
  },
  {
    id: 3,
    screenName: "Sign Up / Create Organisation",
    purpose: "Create Organisation, Licence, and first admin",
    keyFeatures: [
      "Persona selector (Investor/Advisor/Company)",
      "Create Organisation",
      "Create Licence (modules + seats)",
      "Create first user",
      "Assign Org Admin role",
      "Optional billing details"
    ],
    primaryUsers: "First admin",
    notes: "Defines seat count and module access"
  },
  {
    id: 4,
    screenName: "Org Admin – Users & Roles",
    purpose: "Manage users and permissions",
    keyFeatures: [
      "User list",
      "Invite user (email + role)",
      "Seat availability warning",
      "Resend invite",
      "Change role",
      "Deactivate user"
    ],
    primaryUsers: "Org Admin",
    notes: "Invites consume licence seats"
  },
  {
    id: 5,
    screenName: "Portfolio Dashboard",
    purpose: "Portfolio-wide view of all deals",
    keyFeatures: [
      "Global search",
      "Filters (stage, risk, geography, owner, fund)",
      "Quick stats widgets",
      "Lifecycle bands (Origination → Monitoring)",
      "Company tiles"
    ],
    primaryUsers: "Investors, Analysts, IC",
    notes: "Entry point to Module 1"
  },
  {
    id: 6,
    screenName: "Create Deal",
    purpose: "Initialize a new deal",
    keyFeatures: [
      "Company identity fields",
      "Investment thesis",
      "Evaluation parameters",
      "People & access setup",
      "Submit & generate deal"
    ],
    primaryUsers: "Deal Leads, Admins",
    notes: "Creates Deal object"
  },
  {
    id: 7,
    screenName: "Deal Dashboard",
    purpose: "Central workspace per deal",
    keyFeatures: [
      "Deal header",
      "Stage chain navigation",
      "Deal-level metrics",
      "Tabs (Overview, Documents, RFIs, Notes, Access)",
      "Stage content panel"
    ],
    primaryUsers: "Investors, Advisors, IC",
    notes: "Core deal hub"
  },
  {
    id: 8,
    screenName: "Deal Lifecycle Dashboard",
    purpose: "Show full lifecycle + assessment history",
    keyFeatures: [
      "Stage timeline (5 stages)",
      "Current stage highlight",
      "Stage description",
      "Run Assessment CTA",
      "Assessment history table"
    ],
    primaryUsers: "Deal Teams, Ops",
    notes: "Cross-module history view"
  },
  {
    id: 9,
    screenName: "Run Assessment Modal",
    purpose: "Configure a stage-specific assessment",
    keyFeatures: [
      "Company + stage context",
      "Assessment name",
      "Scope selection",
      "Notes",
      "Scan profile",
      "Notification recipients",
      "Submit assessment"
    ],
    primaryUsers: "Deal Teams, Advisors",
    notes: "Creates AssessmentRun"
  },
  {
    id: 10,
    screenName: "Lifecycle Notification Settings",
    purpose: "Control notifications per stage",
    keyFeatures: [
      "Stage rows",
      "Recipient lists",
      "Toggles: completion / high-risk / stage-entry",
      "Save rules"
    ],
    primaryUsers: "Deal Lead, Admin",
    notes: "Tied to email engine"
  },
  {
    id: 11,
    screenName: "Target Search Intelligence (Module 1)",
    purpose: "Search for targets using tech signals",
    keyFeatures: [
      "Keyword search",
      "Filters (sector, geo, cloud, AI)",
      "Tech Health Index",
      "Badges (Cloud, AI, Security)",
      "Provenance indicator",
      "Watchlist / Create Deal / Promote actions"
    ],
    primaryUsers: "Investors, Analysts",
    notes: "Backed by ontology + scoring"
  },
  {
    id: 12,
    screenName: "Target Detail – Tech Assurance",
    purpose: "Drill-down into target signals",
    keyFeatures: [
      "Score breakdown by category",
      "Strengths & risks",
      "Public vs private signals",
      "AI reality check",
      "Promote / Create Deal"
    ],
    primaryUsers: "Investors, Analysts",
    notes: "Bridge to Module 2"
  },
  {
    id: 13,
    screenName: "Origination Band",
    purpose: "Funnel top for Module 1",
    keyFeatures: [
      "Start Search tile",
      "Simple intake",
      "Watchlist tiles",
      "Promote to Pre-LOI"
    ],
    primaryUsers: "Investors",
    notes: "Promotion may trigger billing"
  },
  {
    id: 14,
    screenName: "Pre-LOI Risk Screening (Module 2)",
    purpose: "Early risk assessment",
    keyFeatures: [
      "Company tiles",
      "Risk level badge",
      "Security / Compliance / Architecture checks",
      "Owner + last updated",
      "View summary / Promote"
    ],
    primaryUsers: "Deal Teams",
    notes: "Deal Intake billing trigger"
  },
  {
    id: 15,
    screenName: "Pre-LOI Risk Summary",
    purpose: "Show early findings",
    keyFeatures: [
      "Security findings",
      "Compliance findings",
      "Architecture findings",
      "Recommended actions"
    ],
    primaryUsers: "Deal Teams",
    notes: "Read-before-promote"
  },
  {
    id: 16,
    screenName: "Confirmatory Tech DD (Module 3)",
    purpose: "Track DD execution",
    keyFeatures: [
      "DD progress snapshot",
      "Module indicators",
      "Outstanding RFIs",
      "Assigned analyst",
      "Workspace access"
    ],
    primaryUsers: "DD Teams, Advisors",
    notes: "Covered by intake fee"
  },
  {
    id: 17,
    screenName: "Confirmatory DD Workspace",
    purpose: "Execute deep DD",
    keyFeatures: [
      "Module views",
      "Evidence coverage",
      "RFI management",
      "Analyst notes",
      "Draft/final report"
    ],
    primaryUsers: "DD Teams",
    notes: "Heavy-work environment"
  },
  {
    id: 18,
    screenName: "Post-Implementation Plan (Module 4)",
    purpose: "Value creation planning",
    keyFeatures: [
      "Priority improvement areas",
      "Expected outcomes",
      "Plan status",
      "Value map readiness",
      "Promote to Monitoring"
    ],
    primaryUsers: "Integration Leads",
    notes: "Post-close phase"
  },
  {
    id: 19,
    screenName: "Value Plan & Map View",
    purpose: "Visual roadmap",
    keyFeatures: [
      "Timeline",
      "Dependencies",
      "Expected value impact",
      "Success indicators"
    ],
    primaryUsers: "Integration Teams",
    notes: "Planning only"
  },
  {
    id: 20,
    screenName: "Monitoring / Value Realization (Module 5)",
    purpose: "Long-term oversight",
    keyFeatures: [
      "Monitoring cycle status",
      "New risks",
      "Value progress",
      "Architecture drift",
      "Compliance changes"
    ],
    primaryUsers: "Portfolio Ops, Risk",
    notes: "Recurring oversight"
  },
  {
    id: 21,
    screenName: "Monitoring Report",
    purpose: "Detailed cycle output",
    keyFeatures: [
      "Cycle summary",
      "Risk deltas",
      "Drift details",
      "Compliance updates",
      "Value vs plan"
    ],
    primaryUsers: "Ops, IC",
    notes: "Periodic output"
  },
  {
    id: 22,
    screenName: "Send for Review Modal",
    purpose: "Share stage outputs",
    keyFeatures: [
      "To / CC",
      "Auto-selected docs",
      "Editable subject",
      "Template message",
      "Personal note"
    ],
    primaryUsers: "Deal Leads",
    notes: "Writes Email History"
  },
  {
    id: 23,
    screenName: "Email History",
    purpose: "Audit trail",
    keyFeatures: [
      "Sent email list",
      "Recipients",
      "Stage + document version",
      "Status",
      "Email preview"
    ],
    primaryUsers: "Admin, IC, Legal",
    notes: "Governance-heavy"
  },
  {
    id: 24,
    screenName: "Billing & Usage Overview",
    purpose: "Billing transparency",
    keyFeatures: [
      "Subscription summary",
      "Enabled modules",
      "Seat usage",
      "Deal Intake events",
      "Post-close events",
      "CSV export"
    ],
    primaryUsers: "Org Admin, Finance",
    notes: "Mirrors pricing model"
  }
]

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedModule, setSelectedModule] = useState('all')
  const [expandedRow, setExpandedRow] = useState(null)

  const modules = useMemo(() => {
    const moduleSet = new Set()
    screenData.forEach(screen => {
      const match = screen.screenName.match(/Module (\d+)/)
      if (match) {
        moduleSet.add(match[1])
      }
    })
    return Array.from(moduleSet).sort()
  }, [])

  const filteredData = useMemo(() => {
    return screenData.filter(screen => {
      const matchesSearch = 
        screen.screenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        screen.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
        screen.primaryUsers.toLowerCase().includes(searchTerm.toLowerCase()) ||
        screen.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        screen.keyFeatures.some(feature => 
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        )
      
      const matchesModule = selectedModule === 'all' || 
        screen.screenName.includes(`Module ${selectedModule}`)
      
      return matchesSearch && matchesModule
    })
  }, [searchTerm, selectedModule])

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
          <label htmlFor="module-filter">Filter by Module:</label>
          <select
            id="module-filter"
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="module-select"
          >
            <option value="all">All Screens</option>
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

