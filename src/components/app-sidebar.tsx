import { ComponentProps } from 'react'

import { NavUser } from '@/components/nav-user'
import { ThemeSwitcher } from '@/components/theme-switcher'
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

const data = {
  user: {
    name: 'Arosha Sumanaweera',
    email: 'arosha@zerocap.com',
    avatar: '/avatars/shadcn.jpg',
  },
}

export const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ThemeSwitcher />
      </SidebarHeader>
      <SidebarFooter className="mt-auto">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
