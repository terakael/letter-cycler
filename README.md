# Letter Cycler - Interactive Learning Tool

## Introduction

Letter Cycler is a web-based educational application designed to help children learn letters, sounds, and basic words through interactive flashcards. 

**Key Benefits:**
- Engaging visual interface with large, clear letter displays
- Multiple content types for progressive learning
- Starring system to mark items for focused practice
- Works on both desktop and mobile devices

**Target Audience:**
- Children ages 3-6 learning letter recognition and phonics
- Parents and educators looking for simple, effective teaching tools

## Features

### Content Types
- **Letters**: Lowercase a-z
- **Capitals**: Uppercase A-Z
- **Combos**: Common letter combinations (sh, ch, th, ph)
- **CVC Words**: Simple consonant-vowel-consonant words (cat, dog, etc.)
- **Numbers**: 
  - 11-19
  - 10-90 (by tens)

### Interaction Methods
- **Touch**: Tap to advance, swipe left/right to navigate
- **Keyboard**: Press Enter/Space to advance
- **Buttons**: Toggle content types and features

### UI Features
- **Dark Mode**: Easy-on-the-eyes dark color scheme
- **Responsive Design**: Works on all screen sizes
- **Visual Feedback**: Animations for interactions
- **Star System**: Mark favorite items for focused practice
- **Shuffle**: Randomize item order for varied practice
- **Reset**: Return to first item in current selection

## Usage

### Browser Usage
1. Open `src/index.html` in any modern web browser
2. Tap/click the main display to advance to next item
3. Use the control buttons to customize your experience

### Touch Controls
- **Single tap**: Next item
- **Swipe left**: Next item
- **Swipe right**: Previous item

### Keyboard Controls
- **Enter/Space**: Next item

### Filtering Starred Items
1. Click the star icon on any item to mark it
2. Toggle the ⭐ button to show only starred items

## Deployment

### Docker Setup
1. Build the image:
   ```bash
   docker build -t letter-cycler .
   ```
2. Run the container:
   ```bash
   docker run -p 8080:80 letter-cycler
   ```

### Using build.sh
The build script handles building and pushing to Docker Hub:
```bash
./build.sh [image_tag]
```
- Requires `DOCKER_PAT` environment variable for Docker Hub authentication
- Pushes to `docker.io/terakael/wrqlz:[tag]`

### Kubernetes Deployment
1. Apply the manifests:
   ```bash
   kubectl apply -f manifest/deployment.yaml
   kubectl apply -f manifest/service.yaml
   ```
2. The service exposes port 80 as ClusterIP

### Nginx Configuration
The Docker image uses a standard Nginx configuration serving static files from `/usr/share/nginx/html`

## Requirements
- Modern web browser (Chrome, Firefox, Edge, Safari)
- For deployment: Docker and/or Kubernetes