import { SyntheticEvent } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { useUser } from '../lib/useUser';
import { fetcher } from '../lib/fetchJson';

const HeaderContainer = styled.header`
    padding: 0.2rem;
    color: #fff;
    background-color: #333;
`;
const NavItem = styled.li`
    margin-right: 1rem;
    display: flex;

    &:first-of-type {
        margin-left: auto;
    }
`;
const NavLink = styled.a`
    color: #fff;
    text-decoration: none;
    display: flex;
    align-items: center;
`;
const NavLinkImage = styled.img`
    margin-right: 1em;
`;

const NavigationList = styled.ul`
    display: flex;
    list-style: none;
    margin-left: 0;
    padding-left: 0;
`;

export default function Header() {
    const { user, mutateUser } = useUser();
    const router = useRouter();

    const handleLogoutClick = async (e: SyntheticEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        mutateUser(await fetcher('/api/logout', { method: 'POST' }), false);
        router.push('/login');
    };

    return (
        <HeaderContainer>
            <nav>
                <NavigationList>
                    <NavItem>
                        <Link href="/">
                            <NavLink>Home</NavLink>
                        </Link>
                    </NavItem>
                    {!user?.isLoggedIn && (
                        <NavItem>
                            <Link href="/login">
                                <NavLink>Login</NavLink>
                            </Link>
                        </NavItem>
                    )}
                    {user?.isLoggedIn && (
                        <>
                            <NavItem>
                                <Link href="/profile">
                                    <NavLink>
                                        <NavLinkImage src={user.avatarUrl} width={20} height={20} /> Profile
                                    </NavLink>
                                </Link>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/api/logout" onClick={ handleLogoutClick }>Logout</NavLink>
                            </NavItem>
                        </>
                    )}
                    <li>
                        <NavLink href="https://github.com/vvo/next-iron-session">
                            <NavLinkImage src="/GitHub-Mark-Light-32px.png" width="32" height="32" />
                        </NavLink>
                    </li>
                </NavigationList>
            </nav>
        </HeaderContainer>
    );
}