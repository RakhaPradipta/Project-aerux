# Component Documentation

## Button Component

### Features
- Multiple variants: primary, secondary, outline, ghost, danger, success
- Multiple sizes: sm, md, lg, xl
- Loading state with spinner
- Disabled state
- Custom styling support

### Usage
```jsx
import { Button } from '@/components';

// Basic
<Button>Click me</Button>

// With variants
<Button variant="primary">Primary</Button>
<Button variant="outline">Outline</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// Loading state
<Button isLoading={loading}>Submit</Button>

// With icon
<Button>
  <IoAdd /> Add Item
</Button>
```

## Card Component

### Features
- Multiple variants: default, glass, elevated, gradient
- Hover effects
- Border and shadow customization
- Responsive padding

### Usage
```jsx
import { Card } from '@/components';

<Card variant="gradient">
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>

<Card variant="glass" className="p-8">
  Glass morphism effect
</Card>
```

## Input Component

### Features
- Label support
- Error state with message
- Helper text
- Icon support
- Multiple variants
- Form validation ready

### Usage
```jsx
import { Input } from '@/components';
import { IoMail } from 'react-icons/io5';

<Input
  label="Email"
  type="email"
  placeholder="your@email.com"
  icon={IoMail}
  error={errors.email}
  helperText="We'll never share your email"
/>
```

## Modal Component

### Features
- Animated entrance/exit
- Backdrop click to close
- Footer actions
- Customizable sizes
- Prevents body scroll

### Usage
```jsx
import { Modal, Button } from '@/components';
import { useState } from 'react';

export default function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </>
        }
      >
        <p>Are you sure?</p>
      </Modal>
    </>
  );
}
```

## Badge Component

### Features
- Multiple variants: primary, secondary, success, warning, danger, ghost
- Multiple sizes: sm, md, lg
- Icon support
- Status indicators

### Usage
```jsx
import { Badge } from '@/components';
import { IoCheckmark } from 'react-icons/io5';

<Badge variant="success">Active</Badge>
<Badge variant="warning" size="lg">Pending</Badge>
<Badge variant="danger">Error</Badge>

// With icon
<Badge>
  <IoCheckmark /> Completed
</Badge>
```

## Avatar Component

### Features
- Image or initials
- Online/away/offline status
- Multiple sizes
- Status indicator

### Usage
```jsx
import { Avatar } from '@/components';

// With image
<Avatar 
  src="https://avatar.url" 
  alt="John Doe" 
  size="md"
/>

// With initials
<Avatar alt="Jane Smith" size="lg" />

// With status
<Avatar alt="User" status="online" />
```

## Skeleton Component

### Features
- Multiple variants: text, title, avatar, card, button
- Shimmer animation
- Customizable count

### Usage
```jsx
import { Skeleton } from '@/components';

// Loading text
<Skeleton variant="text" count={3} />

// Loading card
<Skeleton variant="card" />

// Loading avatar
<Skeleton variant="avatar" />
```

## LoadingSpinner Component

### Features
- Animated spinner
- Optional text
- Fullscreen mode
- Customizable size

### Usage
```jsx
import { LoadingSpinner } from '@/components';

// Simple spinner
<LoadingSpinner />

// With text
<LoadingSpinner text="Loading data..." />

// Fullscreen
<LoadingSpinner fullscreen text="Processing..." />
```

## Navbar Component

### Features
- Logo with branding
- Responsive navigation
- Mobile menu
- CTA button
- Auto-collapse on mobile

### Usage
```jsx
// Automatically used in MainLayout
// No additional configuration needed
```

## Form Validation

### Built-in Validation Helpers

```jsx
import { 
  validateEmail, 
  validatePassword, 
  validateForm 
} from '@/utils/helpers';

// Email validation
validateEmail('user@example.com'); // true

// Password validation
validatePassword('12345'); // false (< 8 chars)

// Form validation with rules
const errors = validateForm(formData, {
  email: { required: true, email: true, label: 'Email' },
  password: { required: true, minLength: 8, label: 'Password' },
  name: { required: true, label: 'Name' }
});
```

## Hooks

### useLocalStorage
```jsx
const [value, setValue] = useLocalStorage('key', defaultValue);
// Persists to localStorage automatically
```

### useWindowSize
```jsx
const { width, height } = useWindowSize();
// Updates on resize
```

### useDebounce
```jsx
const debouncedValue = useDebounce(searchQuery, 500);
// Waits 500ms before updating
```

## API Integration Example

```jsx
import { useEffect, useState } from 'react';
import { productsAPI } from '@/api/services';
import { useProductsStore } from '@/store';
import { handleAPIError } from '@/api/errorHandler';

export default function ProductsList() {
  const { products, setProducts, setLoading } = useProductsStore();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getAll();
        setProducts(response.data);
      } catch (err) {
        handleAPIError(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <Card key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </Card>
      ))}
    </div>
  );
}
```

## Styling Patterns

### Responsive Text
```jsx
<h1 className="text-2xl md:text-3xl lg:text-4xl">
  Responsive Heading
</h1>
```

### Glass Effect
```jsx
<div className="glass p-6 rounded-xl">
  Glass Morphism
</div>
```

### Gradient Text
```jsx
<span className="gradient-text">Gradient Text</span>
```

### Hover Animation
```jsx
<Card className="hover:-translate-y-1 transition-smooth">
  Animated Card
</Card>
```
