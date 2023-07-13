import {
  UserProfileFlowRoute,
  useProtocolAuthUserProfileFlow,
} from '../../../contexts/flow-context';
import { cn } from '../../../lib/utils';
import { buttonVariants } from '../../ui/button';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    icon: React.ReactNode;
    route: UserProfileFlowRoute;
    label: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const { route, setRoute } = useProtocolAuthUserProfileFlow();

  return (
    <nav
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <div
          key={item.route}
          onClick={() => setRoute(item.route)}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            item.route === route
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline',
            'cursor-pointer justify-start gap-2',
          )}
        >
          {item.icon}
          {item.label}
        </div>
      ))}
    </nav>
  );
}
