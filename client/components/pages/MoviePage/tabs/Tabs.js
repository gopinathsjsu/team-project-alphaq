import React from 'react';

import About from './About';
import Shows from './Shows';

const tabs = [
  {
    name: 'Shows',
    component: Shows,
  },
  {
    name: 'About',
    component: About,
  },
];

export default function Tabs() {
  const [openTab, setOpenTab] = React.useState(0);

  const CurComponent = tabs[openTab].component;

  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-full">
        <ul
          className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row xxs:flex-col border-b border-alpha"
          role="tablist"
        >
          {tabs.map((tab, index) => (
            <li
              className="-mb-px mr-2 last:mr-0 flex-auto text-center"
              key={tab.name}
            >
              <a
                className={`text-xs font-bold uppercase px-5 py-3  rounded block leading-normal ${
                  openTab === index
                    ? 'text-white bg-alpha'
                    : 'text-alpha2 bg-white'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(index);
                }}
                data-toggle="tab"
                href={`#link${index}`}
                role="tablist"
              >
                <i className="fas fa-info-circle text-base mr-1" />
                {tab.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-1  rounded">
          <div className="px-4 py-5 flex-auto">
            <div className="tab-content tab-space">
              <CurComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
