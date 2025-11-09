#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🐳 Docker Deployment Script${NC}\n"

# Function to display menu
show_menu() {
    echo -e "${YELLOW}Choose an option:${NC}"
    echo "1) Build and run with Docker"
    echo "2) Build and run with Docker Compose"
    echo "3) Stop containers"
    echo "4) View logs"
    echo "5) Rebuild and restart"
    echo "6) Clean up (remove containers and images)"
    echo "7) Exit"
    echo ""
}

# Build and run with Docker
docker_build() {
    echo -e "${YELLOW}Building Docker image...${NC}"
    docker build -t personal-website .
    
    echo -e "${YELLOW}Running container...${NC}"
    docker run -d -p 8080:80 --name personal-website personal-website
    
    echo -e "${GREEN}✅ Website is running at: http://localhost:8080${NC}"
}

# Build and run with Docker Compose
docker_compose_up() {
    echo -e "${YELLOW}Building and starting with Docker Compose...${NC}"
    docker-compose up -d --build
    
    echo -e "${GREEN}✅ Website is running at: http://localhost:8080${NC}"
}

# Stop containers
stop_containers() {
    echo -e "${YELLOW}Stopping containers...${NC}"
    docker stop personal-website 2>/dev/null || docker-compose down
    echo -e "${GREEN}✅ Containers stopped${NC}"
}

# View logs
view_logs() {
    echo -e "${YELLOW}Viewing logs (Press Ctrl+C to exit)...${NC}"
    docker logs -f personal-website 2>/dev/null || docker-compose logs -f
}

# Rebuild and restart
rebuild() {
    echo -e "${YELLOW}Rebuilding and restarting...${NC}"
    stop_containers
    docker rm personal-website 2>/dev/null
    docker-compose up -d --build
    echo -e "${GREEN}✅ Rebuilt and restarted${NC}"
}

# Clean up
cleanup() {
    echo -e "${YELLOW}Cleaning up...${NC}"
    docker stop personal-website 2>/dev/null
    docker rm personal-website 2>/dev/null
    docker rmi personal-website 2>/dev/null
    docker-compose down --rmi all --volumes 2>/dev/null
    echo -e "${GREEN}✅ Cleanup complete${NC}"
}

# Main loop
while true; do
    show_menu
    read -p "Enter choice [1-7]: " choice
    echo ""
    
    case $choice in
        1)
            docker_build
            ;;
        2)
            docker_compose_up
            ;;
        3)
            stop_containers
            ;;
        4)
            view_logs
            ;;
        5)
            rebuild
            ;;
        6)
            cleanup
            ;;
        7)
            echo -e "${GREEN}Goodbye!${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid option. Please try again.${NC}"
            ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
    echo ""
done
