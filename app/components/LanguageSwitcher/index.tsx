'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useCurrentLocale } from 'next-i18n-router/client';

import { ChangeEvent } from 'react';
import i18nConfig from '@/i18nConfig';

const LanguageSwitcher = () => {
  const router = useRouter();
  const currentPathname = usePathname();
  const currentLocale = useCurrentLocale(i18nConfig);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = '; expires=' + date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    if (currentLocale === i18nConfig.defaultLocale) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`),
      );
    }

    router.refresh();
  };

  return (
    <select onChange={handleChange} value={currentLocale}>
      <option value="uk">Ukrainian</option>
      <option value="en">English</option>
    </select>
    // <div className="dropdown ms-1 topbar-head-dropdown header-item">
    //   <button
    //     type="button"
    //     className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
    //     data-bs-toggle="dropdown"
    //     aria-haspopup="true"
    //     aria-expanded="false"
    //   >
    //     <img
    //       id="header-lang-img"
    //       src={'/assets/images/flags/us.svg'}
    //       alt="Header Language"
    //       height="20"
    //       className="rounded"
    //     />
    //   </button>
    //   <div className="dropdown-menu dropdown-menu-end">
    //     <a
    //       href="javascript:void(0);"
    //       className="dropdown-item notify-item language py-2"
    //       data-lang="en"
    //       title="English"
    //     >
    //       <img
    //         src="assets/images/flags/us.svg"
    //         alt="user-image"
    //         className="me-2 rounded"
    //         height="18"
    //       />
    //       <span className="align-middle">English</span>
    //     </a>

    //     <a
    //       href="javascript:void(0);"
    //       className="dropdown-item notify-item language"
    //       data-lang="sp"
    //       title="Spanish"
    //     >
    //       <img
    //         src="assets/images/flags/ua.svg"
    //         alt="user-image"
    //         className="me-2 rounded"
    //         height="18"
    //       />
    //       <span className="align-middle">Ukrainian</span>
    //     </a>
    //   </div>
    // </div>
  );
};

export default LanguageSwitcher;

{
  /* <select onChange={handleChange} value={currentLocale}>
       <option value="uk">Ukrainian</option>
       <option value="en">English</option>
   </select> */
}
