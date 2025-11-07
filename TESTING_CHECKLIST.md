# Testing Checklist for Adopt-a-Coral App

## 🏠 Home Page Testing
- [ ] Page loads without errors
- [ ] Hero section displays correctly with title and subtitle
- [ ] "Your Adoptions" section shows 2 active corals
- [ ] Coral cards display images, names, locations, and dates
- [ ] "View Details" buttons navigate correctly
- [ ] "Learn About" section displays two cards
- [ ] "Donation" section is visible
- [ ] Navigation bar works (Home, Learn, Donate, Admin links)

## 🪸 Coral Detail Page Testing
- [ ] Navigate to a coral (e.g., click "View Details" on Coral Reef #1)
- [ ] Coral image displays large
- [ ] Coral name and location are correct
- [ ] Status badge shows "active"
- [ ] Adoption details card shows correct information
- [ ] Recent updates card shows update count
- [ ] "View All Updates" button works (if updates exist)
- [ ] "Back to Home" link works
- [ ] "Manage Donation" button appears for active adoptions

## 📸 Coral Updates Page Testing
- [ ] Navigate from coral detail page to updates
- [ ] Updates display in reverse chronological order (newest first)
- [ ] Update dates format correctly
- [ ] Update descriptions display properly
- [ ] Photos display (if present)
- [ ] "Back to [Coral Name]" link works
- [ ] Test with coral that has no updates (should show empty state)

## 💰 Donation Page Testing
- [ ] Navigate to /donation
- [ ] Three tabs visible: "One-Time Donation", "Renew Subscription", "Cancel Adoption"
- [ ] **One-Time Donation Tab:**
  - [ ] Amount buttons work ($25, $50, $100, $250, $500)
  - [ ] Custom amount input works
  - [ ] Submit button shows correct amount
  - [ ] Success message appears after submission
- [ ] **Renew Subscription Tab:**
  - [ ] Dropdown shows active adoptions
  - [ ] Can select a coral
  - [ ] Shows next payment date
  - [ ] Renew button works
- [ ] **Cancel Adoption Tab:**
  - [ ] Warning message displays
  - [ ] Dropdown shows active adoptions
  - [ ] Can select a coral to cancel
  - [ ] Shows cancellation warning
  - [ ] Confirmation dialog appears
  - [ ] After cancellation:
    - [ ] Coral status changes to "cancelled"
    - [ ] Coral disappears from active adoptions on home page
    - [ ] Console shows scientist notification (check browser console)

## 📚 Learn Page Testing
- [ ] Navigate to /learn
- [ ] Page title displays
- [ ] Two articles display:
  - [ ] "Responsible Tourism and Coral Reefs"
  - [ ] "The Science Behind Reef-Safe Sunscreen"
- [ ] Article content formats correctly (bold text, lists)
- [ ] "Adopt a Coral" button links to donation page

## 🔧 Admin Portal Testing
- [ ] Navigate to /admin
- [ ] Page loads with "Post Coral Update" form
- [ ] **Update Form:**
  - [ ] Coral dropdown shows all adoptions (including cancelled)
  - [ ] Date picker defaults to today
  - [ ] Description textarea works
  - [ ] Can add multiple photo URLs
  - [ ] Can remove photo fields
  - [ ] Submit button works
  - [ ] Success message appears
  - [ ] Form resets after submission
- [ ] **Status Overview:**
  - [ ] Shows total adoptions count
  - [ ] Shows active count
  - [ ] Shows cancelled count
  - [ ] Cancelled adoptions list displays
- [ ] **Cancellation Blocking:**
  - [ ] Try to post update for cancelled coral
  - [ ] Warning message appears
  - [ ] Submit button is disabled

## 🧪 Functional Testing
- [ ] **Data Persistence:**
  - [ ] Cancel an adoption
  - [ ] Refresh the page
  - [ ] Verify cancellation persists
  - [ ] Post an update from admin
  - [ ] Refresh and verify update persists
- [ ] **Navigation:**
  - [ ] All navbar links work
  - [ ] Browser back/forward buttons work
  - [ ] Direct URL access works (e.g., /coral/1)
  - [ ] 404 handling (try /nonexistent - should show React Router default)
- [ ] **Responsive Design:**
  - [ ] Test on mobile viewport (375px width)
  - [ ] Test on tablet viewport (768px width)
  - [ ] Test on desktop (1920px width)
  - [ ] Images scale properly
  - [ ] Grid layouts adjust
  - [ ] Navigation is usable on mobile

## 🐛 Error Handling Testing
- [ ] Open browser console (F12)
- [ ] Check for any JavaScript errors
- [ ] Check for any console warnings
- [ ] Test with invalid coral ID (should show "Coral not found")
- [ ] Test localStorage (should handle gracefully if disabled)

## ⚡ Performance Testing
- [ ] Page loads quickly (< 3 seconds)
- [ ] Images load properly (may take time for Unsplash images)
- [ ] Smooth transitions and hover effects
- [ ] No layout shifts during load

## 🔍 Cross-Browser Testing
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## 📝 Notes for Testing
- All data is stored in browser localStorage
- Clearing browser data will reset to initial mock data
- Scientist notifications appear in browser console (open DevTools)
- Images are from Unsplash and may take time to load

