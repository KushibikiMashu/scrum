'use client'

import {ChevronRightIcon} from '@heroicons/react/20/solid'
import Link from "next/link";
import {ComponentProps} from "react";
import {BreadcrumbContainer} from "./breadcrumb-container";

type Props = ComponentProps<BreadcrumbContainer>

export default function Breadcrumb({items, current}: Props) {

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-1">
        {items.map((item, i) => (
          <li key={i}>
            <div className="flex items-center">
              {i > 0 && <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>}
              <Link href={item.path} className="text-gray-400 hover:text-gray-500 text-xs">
                <span>{item.name}</span>
              </Link>
            </div>
          </li>
        ))}
        <li>
          <div className="flex items-center">
            <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
            <span
              className="text-xs font-medium text-gray-500"
            >
              {current.name}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  )
}
