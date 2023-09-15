import Button from './components/Button';

export default async function HomePage() {
  return (
    <div>
      <div>HomePage</div>
      <Button border color="secondary">
        Button
      </Button>
      <Button variant="outline">Button</Button>
      <Button variant="soft">Button</Button>
      <Button variant="ghost">Button</Button>
    </div>
  );
}
