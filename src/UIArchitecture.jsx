import { Link } from 'react-router-dom'
import './App.css'
import './UIArchitecture.css'

function UIArchitecture() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>UI Architecture & Navigation</h1>
        <p className="subtitle">Structural layout and navigation hierarchy of the AlethiAI product</p>
      </header>

      <div className="architecture-content">
        <section className="intro-section">
          <p className="intro-text">
            This page defines the structural layout and navigation hierarchy of the AlethiAI product.
            It explains:
          </p>
          <ul className="intro-list">
            <li>how screens are grouped into layouts and frames</li>
            <li>what UI elements persist vs change</li>
            <li>how users move from portfolio → deal → stage</li>
            <li>how modules map to navigation, not separate apps</li>
          </ul>
          <p className="intro-note">
            <strong>This is a UI architecture blueprint, not a visual design spec.</strong>
          </p>
        </section>

        <section className="principle-section">
          <h2>Core Design Principle</h2>
          <p>
            AlethiAI is organized around deals moving through a lifecycle, not around standalone features.
          </p>
          <p>From a UI perspective:</p>
          <ul>
            <li>the portfolio provides breadth</li>
            <li>the deal provides depth</li>
            <li>the lifecycle stage determines context</li>
            <li>services (email, billing, notifications) remain contextual, never dominant</li>
          </ul>
        </section>

        <section className="hierarchy-section">
          <h2>Top-Level Frame Hierarchy</h2>
          <p>At the highest level, the product is structured as follows:</p>
          <div className="tree-structure">
            <div className="tree-item root">App Shell</div>
            <div className="tree-children">
              <div className="tree-item">├── Authentication Flow</div>
              <div className="tree-item">├── Portfolio Dashboard</div>
              <div className="tree-item">├── Deal Dashboard</div>
              <div className="tree-item">└── Settings / Administration</div>
            </div>
          </div>
          <p className="note-text">Each of these is a primary frame, not interchangeable screens.</p>
        </section>

        <section className="auth-section">
          <h2>Authentication & Tenancy Frames</h2>
          <p>These screens sit outside the main app shell and do not share persistent navigation.</p>
          <div className="tree-structure">
            <div className="tree-item root">Authentication Flow</div>
            <div className="tree-children">
              <div className="tree-item">├── Login</div>
              <div className="tree-item">├── SSO Login</div>
              <div className="tree-item">├── Organisation Selector</div>
              <div className="tree-item">├── Role Resolver</div>
              <div className="tree-item">└── Sign Up / Create Organisation</div>
            </div>
          </div>
          <p className="note-text">
            Once resolved, the user is routed directly to their role-appropriate landing view.
            There is no generic "home" screen.
          </p>
        </section>

        <section className="app-shell-section">
          <h2>App Shell (Persistent Layout)</h2>
          <p>Once authenticated, all users operate within the App Shell.</p>
          <div className="persistent-elements">
            <h3>Persistent elements:</h3>
            <ul>
              <li>Global Header</li>
              <li>Global Search</li>
              <li>Notifications access</li>
              <li>User / Organisation menu</li>
            </ul>
          </div>
          <p className="note-text">The App Shell does not change across Portfolio or Deal views.</p>
        </section>

        <section className="portfolio-section">
          <h2>Portfolio Dashboard (Breadth Layer)</h2>
          <p>The Portfolio Dashboard is the primary navigation surface for all deals.</p>
          <div className="tree-structure">
            <div className="tree-item root">Portfolio Dashboard</div>
            <div className="tree-children">
              <div className="tree-item">├── Dashboard Header</div>
              <div className="tree-item indent">│   ├── Global Filters</div>
              <div className="tree-item indent">│   └── Snapshot Metrics</div>
              <div className="tree-item">├── Origination Band (Module 1)</div>
              <div className="tree-item">├── Pre-LOI Risk Band (Module 2)</div>
              <div className="tree-item">├── Confirmatory DD Band (Module 3)</div>
              <div className="tree-item">├── Post-Implementation Plan Band (Module 4)</div>
              <div className="tree-item">└── Monitoring Band (Module 5)</div>
            </div>
          </div>
          <div className="key-characteristics">
            <h3>Key characteristics:</h3>
            <ul>
              <li>Each band represents a lifecycle stage</li>
              <li>Bands are sections, not separate pages</li>
              <li>Deals move horizontally across bands over time</li>
            </ul>
          </div>
        </section>

        <section className="create-deal-section">
          <h2>Create Deal (Contextual Modal)</h2>
          <p>Creating a deal does not navigate away from the Portfolio context.</p>
          <div className="tree-structure">
            <div className="tree-item root">Modal: Create Deal</div>
            <div className="tree-children">
              <div className="tree-item">├── Deal Identity</div>
              <div className="tree-item">├── Investment Thesis</div>
              <div className="tree-item">├── Evaluation Parameters</div>
              <div className="tree-item">├── People & Access</div>
              <div className="tree-item">└── Create Deal Action</div>
            </div>
          </div>
          <p className="note-text">
            This reinforces that:
            <br />• deals originate from the portfolio
            <br />• lifecycle begins immediately upon creation
          </p>
        </section>

        <section className="deal-dashboard-section">
          <h2>Deal Dashboard (Depth Layer)</h2>
          <p>Clicking a deal transitions the user into a deal-scoped workspace.</p>
          <div className="tree-structure">
            <div className="tree-item root">Deal Dashboard</div>
            <div className="tree-children">
              <div className="tree-item">├── Deal Header (persistent)</div>
              <div className="tree-item">├── Stage Chain (navigation)</div>
              <div className="tree-item">├── Deal Metrics Strip</div>
              <div className="tree-item">├── Deal Tabs (persistent)</div>
              <div className="tree-item">└── Stage Content Panel (swaps by stage)</div>
            </div>
          </div>
          <p className="note-text">
            This is the core working environment for all modules beyond Origination.
          </p>
        </section>

        <section className="persistent-elements-section">
          <h2>Persistent Elements Within the Deal Dashboard</h2>
          <p>These elements remain visible regardless of stage:</p>
          <ul>
            <li>Deal Header</li>
            <li>Stage Chain</li>
            <li>Deal Metrics</li>
            <li>Deal Tabs</li>
          </ul>
          <p className="note-text">
            This ensures:
            <br />• orientation is never lost
            <br />• the deal context is always visible
            <br />• navigation is predictable
          </p>
        </section>

        <section className="stage-chain-section">
          <h2>Stage Chain (Lifecycle Navigation)</h2>
          <p>The Stage Chain controls lifecycle navigation only.</p>
          <div className="tree-structure">
            <div className="tree-item root">Stage Chain</div>
            <div className="tree-children">
              <div className="tree-item">├── Pre-LOI</div>
              <div className="tree-item">├── Confirmatory DD</div>
              <div className="tree-item">├── Post-Implementation Plan</div>
              <div className="tree-item">└── Monitoring</div>
            </div>
          </div>
          <div className="rules">
            <h3>Rules:</h3>
            <ul>
              <li>Stages unlock sequentially</li>
              <li>Completed stages remain visible</li>
              <li>Navigation switches only the Stage Content Panel</li>
            </ul>
          </div>
        </section>

        <section className="stage-content-section">
          <h2>Stage Content Panels (Contextual Work Area)</h2>
          <p>Only one Stage Content Panel is active at a time.</p>

          <div className="stage-panel">
            <h3>Pre-LOI Risk Screening (Module 2)</h3>
            <div className="tree-structure">
              <div className="tree-item root">Stage Content: Pre-LOI</div>
              <div className="tree-children">
                <div className="tree-item">├── Risk Summary</div>
                <div className="tree-item">├── Security Findings</div>
                <div className="tree-item">├── Compliance Findings</div>
                <div className="tree-item">├── Architecture Findings</div>
                <div className="tree-item">├── Recommended Actions</div>
                <div className="tree-item">└── Promote to Confirmatory</div>
              </div>
            </div>
          </div>

          <div className="stage-panel">
            <h3>Confirmatory Tech DD (Module 3)</h3>
            <div className="tree-structure">
              <div className="tree-item root">Stage Content: Confirmatory DD</div>
              <div className="tree-children">
                <div className="tree-item">├── DD Progress Overview</div>
                <div className="tree-item">├── Module Status (Security, Data, Architecture, etc.)</div>
                <div className="tree-item">├── Key Findings</div>
                <div className="tree-item">├── Evidence Coverage</div>
                <div className="tree-item">└── Promote to Post-Implementation</div>
              </div>
            </div>
          </div>

          <div className="stage-panel">
            <h3>Post-Implementation Plan (Module 4)</h3>
            <div className="tree-structure">
              <div className="tree-item root">Stage Content: Post-Implementation</div>
              <div className="tree-children">
                <div className="tree-item">├── Value Plan Summary</div>
                <div className="tree-item">├── Priority Improvement Areas</div>
                <div className="tree-item">├── Expected Outcomes</div>
                <div className="tree-item">├── Value Map Readiness</div>
                <div className="tree-item">└── Promote to Monitoring</div>
              </div>
            </div>
          </div>

          <div className="stage-panel">
            <h3>Monitoring & Value Realization (Module 5)</h3>
            <div className="tree-structure">
              <div className="tree-item root">Stage Content: Monitoring</div>
              <div className="tree-children">
                <div className="tree-item">├── Monitoring Cycle Summary</div>
                <div className="tree-item">├── New Risks</div>
                <div className="tree-item">├── Architecture Drift</div>
                <div className="tree-item">├── Compliance Changes</div>
                <div className="tree-item">├── Value Realization Status</div>
                <div className="tree-item">└── Monitoring History</div>
              </div>
            </div>
          </div>
        </section>

        <section className="deal-tabs-section">
          <h2>Deal Tabs (Sub-Systems)</h2>
          <p>These tabs are available across all lifecycle stages.</p>

          <div className="tab-panel">
            <h3>Documents</h3>
            <div className="tree-structure">
              <div className="tree-item root">Documents Tab</div>
              <div className="tree-children">
                <div className="tree-item">├── Folder Structure</div>
                <div className="tree-item">├── File List</div>
                <div className="tree-item">├── Upload</div>
                <div className="tree-item">└── Version History</div>
              </div>
            </div>
          </div>

          <div className="tab-panel">
            <h3>RFIs</h3>
            <div className="tree-structure">
              <div className="tree-item root">RFIs Tab</div>
              <div className="tree-children">
                <div className="tree-item">├── RFI List</div>
                <div className="tree-item">├── Owners</div>
                <div className="tree-item">├── Due Dates</div>
                <div className="tree-item">└── Status</div>
              </div>
            </div>
          </div>

          <div className="tab-panel">
            <h3>Notes & Decisions</h3>
            <div className="tree-structure">
              <div className="tree-item root">Notes & Decisions Tab</div>
              <div className="tree-children">
                <div className="tree-item">├── Internal Notes</div>
                <div className="tree-item">├── IC Decisions</div>
                <div className="tree-item">├── Milestones</div>
                <div className="tree-item">└── Sign-Offs</div>
              </div>
            </div>
          </div>

          <div className="tab-panel">
            <h3>Email History</h3>
            <div className="tree-structure">
              <div className="tree-item root">Email History Tab</div>
              <div className="tree-children">
                <div className="tree-item">├── Sent Emails</div>
                <div className="tree-item">├── Recipients</div>
                <div className="tree-item">├── Attachments</div>
                <div className="tree-item">└── Delivery Status</div>
              </div>
            </div>
          </div>
        </section>

        <section className="global-modals-section">
          <h2>Global Modals & Utilities</h2>
          <p>These overlays may appear on top of Portfolio or Deal views.</p>
          <div className="tree-structure">
            <div className="tree-item root">Global Modals</div>
            <div className="tree-children">
              <div className="tree-item">├── Run Assessment</div>
              <div className="tree-item">├── Send for Review</div>
              <div className="tree-item">├── Notification Settings</div>
              <div className="tree-item">├── Invite User</div>
              <div className="tree-item">├── Org & User Settings</div>
              <div className="tree-item">└── Billing & Usage</div>
            </div>
          </div>
          <p className="note-text">Global modals do not alter navigation context.</p>
        </section>

        <section className="summary-section">
          <h2>Persistent vs Swapping UI (Summary)</h2>
          <div className="summary-grid">
            <div className="summary-column">
              <h3>Persistent across a session</h3>
              <ul>
                <li>Global Header</li>
                <li>Portfolio structure</li>
                <li>Deal Header</li>
                <li>Stage Chain</li>
                <li>Deal Tabs</li>
              </ul>
            </div>
            <div className="summary-column">
              <h3>Contextual / Swapping</h3>
              <ul>
                <li>Portfolio bands</li>
                <li>Stage Content Panels</li>
                <li>Modals</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <footer className="app-footer">
        <nav className="page-nav">
          <Link to="/" className="nav-link">← Screen Planning</Link>
        </nav>
      </footer>
    </div>
  )
}

export default UIArchitecture
