# Personal Programming Portfolio

A modern, responsive portfolio website showcasing Python, C++, and AI projects.

## Features

- **Modern Design**: Clean, dark-themed UI with gradient accents
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Scroll-triggered animations and transitions
- **Project Organization**: Projects categorized by technology (Python, C++, AI)
- **Interactive Elements**: Hover effects, smooth scrolling, and animated statistics

## Project Categories

### Python Projects
- Missile Guidance System (EKF, KF, PID, Proportional Navigation)
- Graph Algorithms (BFS, DFS)
- Physics Resistance Test
- Euler's Method
- Pygame Test
- PID Controller

### C++ Projects
- Acceleration to Displacement (Kalman Filter)
- Autonomous Car (Path Planning, Decision Making)
- VEX Robotics EKF
- Data Structures & Algorithms (Segment Tree, Sparse Table, RMQ)
- Dynamic Programming Solutions
- Time Maze Game

### Stanford Summer School AI Projects
- Linear Regression
- Logistic Regression
- Neural Networks
- Emotion Detection
- Yelp Review Sentiment Classification

## Getting Started

1. **Open the Portfolio**
   - Simply open `index.html` in your web browser
   - No build process or dependencies required!

2. **Set Up GitHub Integration**
   - Open `index.html` and find the `GITHUB_CONFIG` section near the bottom
   - Replace `'YOUR_GITHUB_USERNAME'` with your actual GitHub username
   - Update the repository names in the `repos` object to match your GitHub repository names
   - Add `data-github-repo="repository-key"` attribute to project cards where you want GitHub links
   - The repository key should match a key in the `GITHUB_CONFIG.repos` object
   
   Example:
   ```javascript
   const GITHUB_CONFIG = {
       username: 'elviszhao', // Your GitHub username
       repos: {
           'missileGuidance': 'missile-guidance-repo', // Project folder name: GitHub repo name
           'PythonProject1': 'graph-algorithms-repo',
           // ... add more as needed
       }
   };
   ```
   
   Then add to project cards:
   ```html
   <div class="project-card" data-category="python" data-github-repo="missileGuidance">
   ```

3. **Customization**
   - Edit `index.html` to modify project descriptions
   - Update `styles.css` to change colors, fonts, or layout
   - Modify `script.js` to add new interactions

4. **Add More Projects**
   - Copy a project card structure in `index.html`
   - Update the project details, tags, and files list
   - Add `data-github-repo` attribute if you want clickable GitHub links
   - The card will automatically inherit all styling and animations

## File Structure

```
Portfolio/
├── index.html      # Main HTML structure
├── styles.css      # CSS styling and animations
├── script.js       # JavaScript interactivity
└── README.md       # This file
```

## Color Scheme

- Primary: Indigo (`#6366f1`)
- Background: Dark Slate (`#0f172a`, `#020617`)
- Cards: Dark Blue-Gray (`#1e293b`)
- Text: Light Gray (`#f1f5f9`, `#cbd5e1`)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Add links to GitHub repositories for each project
- Include screenshots or demos
- Add a contact form
- Implement project filtering/search functionality
- Add code snippets preview

---

Built with ❤️ using HTML, CSS, and JavaScript

