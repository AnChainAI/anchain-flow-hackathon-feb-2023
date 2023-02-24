import { Menu, Transition } from '@headlessui/react'
import { useGetFlowUser } from 'hooks'
import { logoutOfWallet } from 'flow'
import { AccountIcon } from 'svgs'
import React from 'react'

export const AccountMenu = () => {
  const { flowUser } = useGetFlowUser()

  const copyAddress = () => {
    if (flowUser?.addr) {
      navigator.clipboard.writeText(flowUser?.addr)
    }
  }

  return (
    <div className="relative">
      <Menu>
        <Menu.Button as={React.Fragment}>
          <div className="z-2 hover:cursor-pointer  hover:brightness-90">
            <AccountIcon />
          </div>
        </Menu.Button>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-10 mt-2 w-36 -translate-x-20 shadow-md">
            <Menu.Item>
              <div
                className="flex h-12 items-center rounded-t-md bg-white px-2 text-black text-opacity-60 hover:cursor-pointer hover:brightness-90"
                onClick={copyAddress}
              >
                <p className="font-raj text-xl font-medium">Copy Address</p>
              </div>
            </Menu.Item>
            <Menu.Item>
              <div
                className="flex h-12 items-center rounded-b-md bg-white px-2 text-black text-opacity-60 hover:cursor-pointer hover:brightness-90"
                onClick={logoutOfWallet}
              >
                <p className="font-raj text-xl font-medium">Logout</p>
              </div>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
