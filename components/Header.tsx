// import { SyntheticEvent } from 'react'
import Link from 'next/link';
// import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useUser } from '@auth0/nextjs-auth0';

// import { useUser } from '../lib/useUser';
// import { fetcher } from '../lib/fetchJson';

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
    // const { user, mutateUser } = useUser();
    const { user, isLoading } = useUser();
    // const router = useRouter();

    // const handleLogoutClick = async (e: SyntheticEvent<HTMLAnchorElement>) => {
    //     e.preventDefault();
    //     mutateUser(await fetcher('/api/logout', { method: 'POST' }), false);
    //     router.push('/login');
    // };

    if (isLoading) {
        // Change to loading layout
        return (
            <HeaderContainer>
                <nav>
                    <NavigationList>
                        <NavItem>
                            Loading...
                        </NavItem>
                    </NavigationList>
                </nav>
            </HeaderContainer>
        )
    }

    return (
        <HeaderContainer>
            <nav>
                <NavigationList>
                    <NavItem>
                        <Link href="/">
                            <NavLink>Inicio</NavLink>
                        </Link>
                    </NavItem>
                    {!user && (
                        <NavItem>
                            <Link href="/api/auth/login">
                                <NavLink>Conectarse</NavLink>
                            </Link>
                        </NavItem>
                    )}
                    {user && (
                        <>
                            <NavItem>
                                <Link href="/task-list">
                                    <NavLink>Lista</NavLink>
                                </Link>
                            </NavItem>

                            <NavItem>
                                <Link href="/profile">
                                    <NavLink>
                                        {/* <NavLinkImage src={user.avatarUrl} width={20} height={20} /> Profile */}
                                        Cuenta <NavLinkImage className="ml-1" src={user.picture as string} width={20} height={20} />
                                    </NavLink>
                                </Link>
                            </NavItem>

                            <NavItem>
                                <NavLink href="/api/auth/logout">Cerrar sesión</NavLink>
                                {/* <NavLink href="/api/auth/logout" onClick={ handleLogoutClick }>Logout</NavLink> */}
                            </NavItem>
                        </>
                    )}
                </NavigationList>
            </nav>
        </HeaderContainer>
    );
}
