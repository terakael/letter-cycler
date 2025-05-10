# Letter Cycler

A webapp that cycles through letters to help kids learn the sounds of letters.  Run through the letters with your child, sounding each one out for them.  When they get better at it, have them try to sound them out.  Shuffle the letters as they get even better at it.

## Usage
- To run locally: Open src/index.html in any modern web browser
- For development: Edit files in src/ directory

## Deployment
- Docker: Build with `docker build -t letter-cycler .` and run with `docker run -p 8080:80 letter-cycler`
- Kubernetes: Apply manifests from manifest/ directory

## Requirements
Modern web browser (Chrome, Firefox, Edge)