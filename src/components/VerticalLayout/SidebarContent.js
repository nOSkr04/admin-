import React, { useEffect, useRef, useCallback } from "react"
import { useLocation } from "react-router-dom"
import PropTypes from "prop-types"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import withRouter from "components/Common/withRouter"
import { Link } from "react-router-dom"

const SidebarContent = props => {
  const ref = useRef()
  const activateParentDropdown = useCallback(item => {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }, [])

  const removeActivation = items => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i]
      const parent = items[i].parentElement

      if (item && item.classList.contains("active")) {
        item.classList.remove("active")
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show")
        }

        parent.classList.remove("mm-active")
        const parent2 = parent.parentElement

        if (parent2) {
          parent2.classList.remove("mm-show")

          const parent3 = parent2.parentElement
          if (parent3) {
            parent3.classList.remove("mm-active") // li
            parent3.childNodes[0].classList.remove("mm-active")

            const parent4 = parent3.parentElement // ul
            if (parent4) {
              parent4.classList.remove("mm-show") // ul
              const parent5 = parent4.parentElement
              if (parent5) {
                parent5.classList.remove("mm-show") // li
                parent5.childNodes[0].classList.remove("mm-active") // a tag
              }
            }
          }
        }
      }
    }
  }

  const path = useLocation()
  const activeMenu = useCallback(() => {
    const pathName = path.pathname
    let matchingMenuItem = null
    const ul = document.getElementById("side-menu")
    const items = ul.getElementsByTagName("a")
    removeActivation(items)

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }
  }, [path.pathname, activateParentDropdown])

  useEffect(() => {
    ref.current.recalculate()
  }, [])

  useEffect(() => {
    new MetisMenu("#side-menu")
    activeMenu()
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    activeMenu()
  }, [activeMenu])

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">Menu </li>
            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-home-circle"></i>
                <span>Dashboards</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/dashboard">Default</Link>
                </li>
                <li>
                  <Link to="#">Saas</Link>
                </li>
                <li>
                  <Link to="#">Crypto</Link>
                </li>
                <li>
                  <Link to="#">Blog</Link>
                </li>
                <li>
                  <Link to="#">Job</Link>
                </li>
              </ul>
            </li>

            <li className="menu-title">Apps</li>

            <li>
              <Link to="#">
                <i className="bx bx-calendar"></i>
                <span>Calendar</span>
              </Link>
            </li>

            <li>
              <Link to="#">
                <i className="bx bx-chat"></i>
                <span>Chat</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="bx bx-file"></i>
                <span>File Manager</span>
              </Link>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-store"></i>
                <span>Ecommerce</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">Products</Link>
                </li>
                <li>
                  <Link to="#">Product Detail</Link>
                </li>
                <li>
                  <Link to="#">Orders</Link>
                </li>
                <li>
                  <Link to="#">Customers</Link>
                </li>
                <li>
                  <Link to="#">Cart</Link>
                </li>
                <li>
                  <Link to="#">Checkout</Link>
                </li>
                <li>
                  <Link to="#">Shops</Link>
                </li>
                <li>
                  <Link to="#">Add Product</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-bitcoin"></i>
                <span>Crypto</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">Wallet</Link>
                </li>
                <li>
                  <Link to="#">Buy/Sell</Link>
                </li>
                <li>
                  <Link to="#">Exchange</Link>
                </li>
                <li>
                  <Link to="#">Lending</Link>
                </li>
                <li>
                  <Link to="#">Orders</Link>
                </li>
                <li>
                  <Link to="#">KYC Application</Link>
                </li>
                <li>
                  <Link to="#">ICO Landing</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-envelope"></i>
                <span>Email</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">Inbox</Link>
                </li>
                <li>
                  <Link to="#">Read Email </Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow ">
                    <span key="#">Templates</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="#">Basic Action</Link>
                    </li>
                    <li>
                      <Link to="#">Alert Email </Link>
                    </li>
                    <li>
                      <Link to="#">Billing Email </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-receipt"></i>
                <span>Invoices</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">Invoice List</Link>
                </li>
                <li>
                  <Link to="#">Invoice Detail</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-briefcase-alt-2"></i>
                <span>Projects</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">Projects Grid</Link>
                </li>
                <li>
                  <Link to="#">Projects List</Link>
                </li>
                <li>
                  <Link to="#">Project Overview</Link>
                </li>
                <li>
                  <Link to="#">Create New</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-task"></i>
                <span>Tasks</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">Task List</Link>
                </li>
                <li>
                  <Link to="#">Kanban Board</Link>
                </li>
                <li>
                  <Link to="#">Create Task</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bxs-user-detail"></i>
                <span>Contacts</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">User Grid</Link>
                </li>
                <li>
                  <Link to="#">User List</Link>
                </li>
                <li>
                  <Link to="#">Profile</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bxs-detail" />

                <span>Blog</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">Blog List</Link>
                </li>
                <li>
                  <Link to="#">Blog Grid</Link>
                </li>
                <li>
                  <Link to="#">Blog Details</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-briefcase-alt"></i>
                <span key="t-jobs">Jobs</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">Job List</Link>
                </li>
                <li>
                  <Link to="#">Job Grid</Link>
                </li>
                <li>
                  <Link to="#">Apply Job</Link>
                </li>
                <li>
                  <Link to="#">Job Details</Link>
                </li>
                <li>
                  <Link to="#">Jobs Categories</Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    Candidate
                  </Link>
                  <ul className="sub-menu" aria-expanded="true">
                    <li>
                      <Link to="#">List</Link>
                    </li>
                    <li>
                      <Link to="#">Overview</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li className="menu-title">Pages</li>
            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-user-circle"></i>
                <span>Authentication</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">Login</Link>
                </li>
                <li>
                  <Link to="#">Login 2</Link>
                </li>
                <li>
                  <Link to="#">Register</Link>
                </li>
                <li>
                  <Link to="#">Register 2</Link>
                </li>
                <li>
                  <Link to="#">Recover Password</Link>
                </li>
                <li>
                  <Link to="#">Recover Password 2</Link>
                </li>
                <li>
                  <Link to="#">Lock Screen</Link>
                </li>
                <li>
                  <Link to="#">Lock Screen 2</Link>
                </li>
                <li>
                  <Link to="#">Confirm Mail</Link>
                </li>
                <li>
                  <Link to="#">Confirm Mail 2</Link>
                </li>
                <li>
                  <Link to="#">Email Verification</Link>
                </li>
                <li>
                  <Link to="#">Email Verification 2</Link>
                </li>
                <li>
                  <Link to="#">Two Step Verification</Link>
                </li>
                <li>
                  <Link to="#">Two Step Verification 2</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-file"></i>
                <span>Utility</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">Starter Page</Link>
                </li>
                <li>
                  <Link to="#">Maintenance</Link>
                </li>
                <li>
                  <Link to="#">Coming Soon</Link>
                </li>
                <li>
                  <Link to="#">Timeline</Link>
                </li>
                <li>
                  <Link to="#">FAQs</Link>
                </li>
                <li>
                  <Link to="#">Pricing</Link>
                </li>
                <li>
                  <Link to="#">Error 404</Link>
                </li>
                <li>
                  <Link to="#">Error 500</Link>
                </li>
              </ul>
            </li>

            <li className="menu-title">Components</li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-tone" />
                <span>UI Elements</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">Alerts</Link>
                </li>
                <li>
                  <Link to="#">Buttons</Link>
                </li>
                <li>
                  <Link to="#">Cards</Link>
                </li>
                <li>
                  <Link to="#">Carousel</Link>
                </li>
                <li>
                  <Link to="#">Dropdowns</Link>
                </li>
                <li>
                  <Link to="#">Grid</Link>
                </li>
                <li>
                  <Link to="#">Images</Link>
                </li>
                <li>
                  <Link to="#">Lightbox</Link>
                </li>
                <li>
                  <Link to="#">Modals</Link>
                </li>
                <li>
                  <Link to="#">OffCanvas</Link>
                </li>
                <li>
                  <Link to="#">Range Slider</Link>
                </li>
                <li>
                  <Link to="#">Session Timeout</Link>
                </li>
                <li>
                  <Link to="#">Progress Bars</Link>
                </li>
                <li>
                  <Link to="#">Placeholders</Link>
                </li>
                <li>
                  <Link to="#">Tabs & Accordions</Link>
                </li>
                <li>
                  <Link to="#">Typography</Link>
                </li>
                <li>
                  <Link to="#">Toasts</Link>
                </li>
                <li>
                  <Link to="#">Video</Link>
                </li>
                <li>
                  <Link to="#">General</Link>
                </li>
                <li>
                  <Link to="#">Colors</Link>
                </li>
                <li>
                  <Link to="#">Rating</Link>
                </li>
                <li>
                  <Link to="#">Notifications</Link>
                </li>
                {/* <li>
                  <Link to="#">
                    Breadcrumb
                  </Link>
                </li> */}
                <li>
                  <Link to="#">Utilities</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#">
                <i className="bx bxs-eraser"></i>
                <span className="badge rounded-pill bg-danger float-end">
                  10
                </span>
                <span>Forms</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">Form Elements</Link>
                </li>
                <li>
                  <Link to="#">Form Layouts</Link>
                </li>
                <li>
                  <Link to="#">Form Validation</Link>
                </li>
                <li>
                  <Link to="#">Form Advanced</Link>
                </li>
                <li>
                  <Link to="#">Form Editors</Link>
                </li>
                <li>
                  <Link to="#">Form File Upload </Link>
                </li>
                <li>
                  <Link to="#">Form Repeater</Link>
                </li>
                <li>
                  <Link to="#">Form Wizard</Link>
                </li>
                <li>
                  <Link to="#">Form Mask</Link>
                </li>
                {/* <li>
                  <Link to="/dual-listbox">Transfer List</Link>
                </li> */}
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-list-ul"></i>
                <span>Tables</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">Basic Tables</Link>
                </li>
                <li>
                  <Link to="#">Data Tables</Link>
                </li>
                {/* <li>
                  <Link to="/tables-responsive">
                    Responsive Table
                  </Link>
                </li>
                <li>
                  <Link to="/tables-dragndrop">Drag & Drop Table</Link>
                </li> */}
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bxs-bar-chart-alt-2"></i>
                <span>Charts</span>
              </Link>

              <ul className="sub-menu">
                <li>
                  <Link to="#">Apex charts</Link>
                </li>
                <li>
                  <Link to="#">Chartjs Chart</Link>
                </li>
                <li>
                  <Link to="#">E Chart</Link>
                </li>
                <li>
                  <Link to="#">Sparkline Chart</Link>
                </li>
                <li>
                  <Link to="#">Knob Chart</Link>
                </li>
                <li>
                  <Link to="#">Re Chart</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-aperture"></i>
                <span>Icons</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">Boxicons</Link>
                </li>
                <li>
                  <Link to="#">Material Design</Link>
                </li>
                <li>
                  <Link to="#">Dripicons</Link>
                </li>
                <li>
                  <Link to="#">Font awesome</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-map"></i>
                <span>Maps</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="#">Google Maps</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow ">
                <i className="bx bx-share-alt"></i>
                <span>Multi Level</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/#">Level 1.1</Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    Level 1.2
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/#">Level 2.1</Link>
                    </li>
                    <li>
                      <Link to="/#">Level 2.2</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(SidebarContent)
