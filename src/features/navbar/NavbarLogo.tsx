import React from 'react'
import logo from '../../assets/images/logo.png'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const NavbarLogo = () => {
    const { t } = useTranslation('navbar')

    return (
        <Link to={'/worklenz/home'}>
            <img
                src={logo}
                alt={t('logoAlt')}
                style={{ width: '100%', maxWidth: 140 }}
            />
        </Link>
    )
}

export default NavbarLogo
