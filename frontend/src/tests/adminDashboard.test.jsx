import { render, fireEvent, screen } from '@testing-library/react';
import Sidebar from '../components/adminDashboard/adminDashboard';
import '@testing-library/jest-dom';

// Mocking window.innerWidth for responsive behavior
global.innerWidth = 1024;

describe('Sidebar Component', () => {
  let toggleSidebarMock;

  beforeEach(() => {
    toggleSidebarMock = jest.fn();
  });

  test('renders sidebar visible on desktop by default', () => {
    render(<Sidebar sidebarVisible={true} toggleSidebar={toggleSidebarMock} />);

    // Check if sidebar is visible
    const sidebar = screen.getByRole('navigation');  // Assuming CSidebar has role "navigation"
    expect(sidebar).toHaveStyle('transform: translateX(0)');  // Sidebar should not be hidden
  });

  test('shows hamburger menu on mobile', () => {
    // Mock mobile viewport
    global.innerWidth = 375;
    render(<Sidebar sidebarVisible={true} toggleSidebar={toggleSidebarMock} />);

    const hamburgerMenu = screen.getByRole('button');
    expect(hamburgerMenu).toBeInTheDocument();
  });

  test('sidebar toggles visibility on mobile when hamburger menu clicked', () => {
    global.innerWidth = 375; // Set mobile view
    render(<Sidebar sidebarVisible={true} toggleSidebar={toggleSidebarMock} />);

    const hamburgerMenu = screen.getByRole('button');
    fireEvent.click(hamburgerMenu); // Click to toggle sidebar

    const sidebar = screen.getByRole('navigation');
    expect(sidebar).toHaveStyle('transform: translateX(-100%)'); // Sidebar should be hidden

    fireEvent.click(hamburgerMenu); // Click again to show sidebar
    expect(sidebar).toHaveStyle('transform: translateX(0)'); // Sidebar should be visible
  });

  test('sidebar stays visible when switching from mobile to desktop', () => {
    global.innerWidth = 375; // Set mobile view
    render(<Sidebar sidebarVisible={true} toggleSidebar={toggleSidebarMock} />);

    const hamburgerMenu = screen.getByRole('button');
    fireEvent.click(hamburgerMenu); // Hide sidebar on mobile

    // Switch to desktop
    global.innerWidth = 1024;
    fireEvent.resize(window); // Trigger resize event

    const sidebar = screen.getByRole('navigation');
    expect(sidebar).toHaveStyle('transform: translateX(0)'); // Sidebar should remain visible on desktop
  });

  test('sidebar updates visibility based on prop on mobile', () => {
    global.innerWidth = 375; // Set mobile view
    render(<Sidebar sidebarVisible={false} toggleSidebar={toggleSidebarMock} />);

    const sidebar = screen.getByRole('navigation');
    expect(sidebar).toHaveStyle('transform: translateX(-100%)'); // Sidebar should be hidden on mobile
  });

  test('sidebar visibility state is reset correctly on window resize', () => {
    global.innerWidth = 375; // Set mobile view
    render(<Sidebar sidebarVisible={false} toggleSidebar={toggleSidebarMock} />);

    const sidebar = screen.getByRole('navigation');
    expect(sidebar).toHaveStyle('transform: translateX(-100%)'); // Sidebar should be hidden on mobile

    // Resize to desktop
    global.innerWidth = 1024;
    fireEvent.resize(window); // Trigger resize event

    expect(sidebar).toHaveStyle('transform: translateX(0)'); // Sidebar should be visible on desktop
  });
});
