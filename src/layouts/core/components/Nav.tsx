import {AirtableAttachment} from '@/modules/core/data/types/AirtableAttachment';
import {isActive, resolveI18nHomePage} from '@/modules/core/i18n/i18nRouter';
import AirtableAsset from '@/modules/core/airtable/components/AirtableAsset';
import {Nav as NavStrap, Navbar, NavItem, NavLink} from 'reactstrap';
import {LogEvent} from '@/modules/core/amplitude/types/Amplitude';
import useI18n, {I18n} from '@/modules/core/i18n/hooks/useI18n';
import I18nLink from '@/modules/core/i18n/components/I18nLink';
import {Asset} from '@/modules/core/data/types/Asset';
import {Amplitude} from '@amplitude/react-amplitude';
import {NextRouter, useRouter} from 'next/router';
import {useTranslation} from 'react-i18next';
import {css, useTheme} from '@emotion/react';
import React from 'react';

export type Props = {};

const Nav: React.FunctionComponent<Props> = () => {
  const theme = useTheme();
  const {t} = useTranslation();
  const {locale}: I18n = useI18n();
  const router: NextRouter = useRouter();
  const {primaryColor, logo: logoAirtable} = theme;
  const logo: AirtableAttachment = logoAirtable;

  return (
    <Amplitude>
      {({logEvent}: { logEvent: LogEvent }): JSX.Element => (
        <Navbar
          id={'nav'}
          color="#F5F5F5"
          light
          css={css`
            background-color: #F5F5F5;
            align-items: center;

            @media (min-width: 992px) {
              margin-left: 80px;
              margin-right: 80px;
            }

            @media (max-width: 991.98px) {
              margin-left: 10px;
              margin-right: 10px;

              li {
                margin: 10px !important;
              }
            }

            @media (max-width: 350px) {
              padding: 0 !important;
            }

            .brand-logo {
              min-width: 175px;
            }

            .navItemsMenu {
              padding: 0 10px;

              @media (max-width: 991.98px) {
                a {
                  font-size: 12px;
                  color: rgba(0, 0, 0, 0.30) !important;
                }
              }
            }

            .navbar-nav {
              flex-direction: row;

              li {
                margin: 10px 20px;
                text-align: center;
                justify-content: center;

                a {
                  cursor: pointer;
                  color: #000 !important;
                }
              }
            }

            .nav-link {
              &.active {
                font-weight: bold;
                color: ${primaryColor} !important;
              }
            }

            .dropdown {
              padding-top: 8px;
              padding-bottom: 8px;
              cursor: pointer;

              .dropdown-toggle {
                &.active {
                  color: ${primaryColor};
                }
              }

              .dropdown-menu {
                z-index: 10000;
              }

              .dropdown-item {
                max-height: 30px;
                padding-top: 0;

                .nav-link {
                  padding: 4px;
                }
              }
            }

            .dropdown-header,
            .dropdown-divider {
              cursor: initial;
            }
          `}
        >
          <div className={'brand-logo'}>
            <AirtableAsset
              id={'nav-logo-brand'}
              asset={logo as unknown as Asset}
              linkOverride={{
                id: 'nav-open-app-link',
                url: resolveI18nHomePage(locale)?.i18nHref || '/',
                target: null,
              }} // Force link to redirect to home
              transformationsOverride={{
                height: 60,
              }}
            />
          </div>

          <NavStrap navbar>

            <NavItem>
              <I18nLink href={`/`} wrapChildrenAsLink={false}>
                <NavLink id={'nav-link-home'} active={isActive(router, '')}>
                  {t('nav.link.home', 'Accueil')}
                </NavLink>
              </I18nLink>
            </NavItem>

            <NavItem>
              <I18nLink href={`/men`} wrapChildrenAsLink={false}>
                <NavLink id={'nav-link-men'} active={isActive(router, 'men')}>
                  {t('nav.link.men', 'Hommes')}
                </NavLink>
              </I18nLink>
            </NavItem>

            <NavItem>
              <I18nLink href={`/women`} wrapChildrenAsLink={false}>
                <NavLink id={'nav-link-women'} active={isActive(router, 'women')}>
                  {t('nav.link.women', 'Femmes')}
                </NavLink>
              </I18nLink>
            </NavItem>

          </NavStrap>
        </Navbar>
      )}
    </Amplitude>
  );
};

export default Nav;
