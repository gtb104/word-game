import { render } from '@testing-library/react';
import ScrollBox from './ScrollBox';

describe('ScrollBox', () => {
  // Tests with expected children
  test('renders with text children', () => {
    const { container } = render(<ScrollBox>Hello world</ScrollBox>);
    expect(container.querySelector('.scroll-box')).toBeTruthy();
    expect(container.textContent).toBe('Hello world');
  });

  test('renders with element children', () => {
    const { container } = render(<ScrollBox><div>Test content</div></ScrollBox>);
    expect(container.querySelector('.scroll-box')).toBeTruthy();
    expect(container.textContent).toBe('Test content');
  });

  test('renders with multiple children', () => {
    const { container } = render(
      <ScrollBox>
        <div>First child</div>
        <div>Second child</div>
      </ScrollBox>
    );
    expect(container.textContent).toContain('First child');
    expect(container.textContent).toContain('Second child');
  });

  test('renders with nested children', () => {
    const { container } = render(
      <ScrollBox>
        <div>
          <span>Nested content</span>
        </div>
      </ScrollBox>
    );
    expect(container.textContent).toContain('Nested content');
  });

  // Tests without children
  test('renders without children', () => {
    const { container } = render(<ScrollBox />);
    expect(container.querySelector('.scroll-box')).toBeTruthy();
    expect(container.textContent).toBe('');
  });

  // Tests with unexpected children
  test('renders with null child', () => {
    const { container } = render(<ScrollBox>{null}</ScrollBox>);
    expect(container.querySelector('.scroll-box')).toBeTruthy();
    expect(container.textContent).toBe('');
  });

  test('renders with undefined child', () => {
    const { container } = render(<ScrollBox>{undefined}</ScrollBox>);
    expect(container.querySelector('.scroll-box')).toBeTruthy();
    expect(container.textContent).toBe('');
  });

  test('renders with boolean child', () => {
    const { container } = render(<ScrollBox>{true}</ScrollBox>);
    expect(container.querySelector('.scroll-box')).toBeTruthy();
    // React doesn't render boolean values
    expect(container.textContent).toBe('');
  });

  test('renders with number child', () => {
    const { container } = render(<ScrollBox>{42}</ScrollBox>);
    expect(container.querySelector('.scroll-box')).toBeTruthy();
    expect(container.textContent).toBe('42');
  });
});
