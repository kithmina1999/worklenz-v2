import React from 'react'
import logo from '../../assets/images/logo.png'
import { useTranslation } from 'react-i18next'

const NavbarLogo = () => {
    const { t } = useTranslation('navbar')

    return (
        <img
            src={logo}
            alt={t('logoAlt')}
            style={{ width: '100%', maxWidth: 140 }}
        />
    )
}

export default NavbarLogo
