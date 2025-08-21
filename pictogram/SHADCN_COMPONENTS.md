# shadcn/ui Components Reference

This document serves as a comprehensive reference for all available shadcn/ui components in this project. **Always use these components when building UI elements instead of creating custom ones.**

## 🚀 Setup Complete
- ✅ shadcn/ui initialized with "New York" style
- ✅ All 47 components installed
- ✅ TypeScript support enabled
- ✅ Dark/Light theme support
- ✅ Radix UI primitives included
- ✅ Tailwind CSS v4 integration

## 📋 Available Components

### **Form & Input Components**
Use these for any user input or form functionality:

| Component | File | Usage | Description |
|-----------|------|-------|-------------|
| `Button` | `button.tsx` | `<Button variant="default">Click me</Button>` | Primary action buttons with variants |
| `Input` | `input.tsx` | `<Input placeholder="Enter text..." />` | Text input fields |
| `Textarea` | `textarea.tsx` | `<Textarea placeholder="Enter message..." />` | Multi-line text input |
| `Checkbox` | `checkbox.tsx` | `<Checkbox id="terms" />` | Checkbox input with label support |
| `Radio Group` | `radio-group.tsx` | `<RadioGroup><RadioGroupItem /></RadioGroup>` | Radio button groups |
| `Switch` | `switch.tsx` | `<Switch checked={isOn} />` | Toggle switch component |
| `Select` | `select.tsx` | `<Select><SelectTrigger><SelectValue /></SelectTrigger></Select>` | Dropdown select menus |
| `Label` | `label.tsx` | `<Label htmlFor="input">Label text</Label>` | Form labels |
| `Form` | `form.tsx` | `<Form><FormField /></Form>` | Form wrapper with validation |
| `Input OTP` | `input-otp.tsx` | `<InputOTP maxLength={6} />` | One-time password input |

### **Layout & Navigation Components**
Use these for page structure and navigation:

| Component | File | Usage | Description |
|-----------|------|-------|-------------|
| `Card` | `card.tsx` | `<Card><CardHeader><CardTitle /></CardHeader></Card>` | Content containers |
| `Accordion` | `accordion.tsx` | `<Accordion type="single"><AccordionItem /></Accordion>` | Collapsible content sections |
| `Tabs` | `tabs.tsx` | `<Tabs><TabsList><TabsTrigger /></TabsList></Tabs>` | Tab navigation |
| `Breadcrumb` | `breadcrumb.tsx` | `<Breadcrumb><BreadcrumbItem /></Breadcrumb>` | Navigation breadcrumbs |
| `Navigation Menu` | `navigation-menu.tsx` | `<NavigationMenu><NavigationMenuItem /></NavigationMenu>` | Main navigation menus |
| `Menubar` | `menubar.tsx` | `<Menubar><MenubarMenu /></Menubar>` | Application menu bar |
| `Sidebar` | `sidebar.tsx` | `<Sidebar><SidebarContent /></Sidebar>` | Sidebar navigation |
| `Separator` | `separator.tsx` | `<Separator />` | Visual content dividers |
| `Aspect Ratio` | `aspect-ratio.tsx` | `<AspectRatio ratio={16/9} />` | Maintain aspect ratios |
| `Resizable` | `resizable.tsx` | `<ResizablePanelGroup><ResizablePanel /></ResizablePanelGroup>` | Resizable panels |

### **Data Display Components**
Use these for showing information and data:

| Component | File | Usage | Description |
|-----------|------|-------|-------------|
| `Table` | `table.tsx` | `<Table><TableHeader><TableRow /></TableHeader></Table>` | Data tables |
| `Chart` | `chart.tsx` | `<ChartContainer><BarChart /></ChartContainer>` | Data visualization charts |
| `Badge` | `badge.tsx` | `<Badge variant="secondary">New</Badge>` | Status indicators and tags |
| `Avatar` | `avatar.tsx` | `<Avatar><AvatarImage src="" /></Avatar>` | User profile images |
| `Calendar` | `calendar.tsx` | `<Calendar mode="single" />` | Date picker calendar |
| `Progress` | `progress.tsx` | `<Progress value={60} />` | Progress indicators |
| `Skeleton` | `skeleton.tsx` | `<Skeleton className="h-4 w-[250px]" />` | Loading placeholders |
| `Pagination` | `pagination.tsx` | `<Pagination><PaginationItem /></Pagination>` | Page navigation |

### **Interactive & Overlay Components**
Use these for user interactions and overlays:

| Component | File | Usage | Description |
|-----------|------|-------|-------------|
| `Dialog` | `dialog.tsx` | `<Dialog><DialogTrigger><DialogContent /></Dialog>` | Modal dialogs |
| `Alert Dialog` | `alert-dialog.tsx` | `<AlertDialog><AlertDialogTrigger /></AlertDialog>` | Confirmation dialogs |
| `Sheet` | `sheet.tsx` | `<Sheet><SheetTrigger><SheetContent /></Sheet>` | Sliding panels |
| `Drawer` | `drawer.tsx` | `<Drawer><DrawerTrigger><DrawerContent /></Drawer>` | Mobile-friendly drawers |
| `Popover` | `popover.tsx` | `<Popover><PopoverTrigger><PopoverContent /></Popover>` | Floating content |
| `Tooltip` | `tooltip.tsx` | `<Tooltip><TooltipTrigger><TooltipContent /></Tooltip>` | Hover information |
| `Hover Card` | `hover-card.tsx` | `<HoverCard><HoverCardTrigger /></HoverCard>` | Rich hover content |
| `Command` | `command.tsx` | `<Command><CommandInput><CommandList /></Command>` | Command palette/search |
| `Dropdown Menu` | `dropdown-menu.tsx` | `<DropdownMenu><DropdownMenuTrigger /></DropdownMenu>` | Dropdown menus |
| `Context Menu` | `context-menu.tsx` | `<ContextMenu><ContextMenuTrigger /></ContextMenu>` | Right-click menus |

### **Control & Utility Components**
Use these for interactive controls and utilities:

| Component | File | Usage | Description |
|-----------|------|-------|-------------|
| `Slider` | `slider.tsx` | `<Slider defaultValue={[50]} max={100} />` | Range sliders |
| `Toggle` | `toggle.tsx` | `<Toggle pressed={isPressed}>Bold</Toggle>` | Toggle buttons |
| `Toggle Group` | `toggle-group.tsx` | `<ToggleGroup type="single"><ToggleGroupItem /></ToggleGroup>` | Toggle button groups |
| `Collapsible` | `collapsible.tsx` | `<Collapsible><CollapsibleTrigger /></Collapsible>` | Expandable content |
| `Scroll Area` | `scroll-area.tsx` | `<ScrollArea className="h-[200px]" />` | Custom scrollbars |
| `Carousel` | `carousel.tsx` | `<Carousel><CarouselContent><CarouselItem /></Carousel>` | Image/content carousels |

### **Feedback Components**
Use these for user feedback and notifications:

| Component | File | Usage | Description |
|-----------|------|-------|-------------|
| `Alert` | `alert.tsx` | `<Alert><AlertTitle><AlertDescription /></Alert>` | Information alerts |
| `Sonner` | `sonner.tsx` | `toast("Hello World")` | Toast notifications |

## 🎨 Component Usage Patterns

### **Import Pattern**
Always use the `@/components/ui/*` import path:
```typescript
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
```

### **Common Combinations**
Here are frequent component combinations to use:

#### **Form Section**
```tsx
<Card>
  <CardHeader>
    <CardTitle>User Information</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <div>
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="Enter your name" />
    </div>
    <div>
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="Enter your email" />
    </div>
    <Button>Submit</Button>
  </CardContent>
</Card>
```

#### **Data Display**
```tsx
<Card>
  <CardHeader>
    <CardTitle>User Profile</CardTitle>
  </CardHeader>
  <CardContent className="flex items-center space-x-4">
    <Avatar>
      <AvatarImage src="/avatar.jpg" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <div>
      <h3 className="font-semibold">John Doe</h3>
      <Badge variant="secondary">Premium User</Badge>
    </div>
  </CardContent>
</Card>
```

#### **Navigation Menu**
```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Product 1</NavigationMenuLink>
        <NavigationMenuLink>Product 2</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

## 🔧 Custom Hook
| Hook | File | Usage | Description |
|------|------|-------|-------------|
| `useMobile` | `hooks/use-mobile.ts` | `const isMobile = useMobile()` | Detect mobile devices |

## 🎯 **Development Guidelines**

### **Always Use shadcn Components When:**
- ✅ Building forms (use Form, Input, Button, etc.)
- ✅ Creating navigation (use Navigation Menu, Breadcrumb, Tabs)
- ✅ Displaying data (use Table, Card, Badge, Avatar)
- ✅ Adding interactions (use Dialog, Popover, Dropdown Menu)
- ✅ Showing feedback (use Alert, Sonner for toasts)
- ✅ Creating layouts (use Card, Separator, Aspect Ratio)

### **Component Variants**
Most components have built-in variants:
```typescript
// Button variants
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Badge variants
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>
```

### **Theming**
All components support the CSS variable theming system and automatically adapt to dark/light mode.

## 📚 **Key Dependencies Included**
- `@radix-ui/*` - Accessible component primitives
- `react-hook-form` + `zod` - Form handling and validation
- `lucide-react` - Icon library
- `recharts` - Chart components
- `next-themes` - Theme management
- `sonner` - Toast notifications
- `cmdk` - Command interface
- `date-fns` + `react-day-picker` - Date handling

---

**Remember: Always check this reference first before creating custom UI components. Use shadcn/ui components whenever possible for consistency, accessibility, and maintainability.**

