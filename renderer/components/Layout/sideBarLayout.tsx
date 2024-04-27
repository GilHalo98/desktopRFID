import SideBar from '../../components/sidebar/sidebar'

export default function SideBarLayout({
        children,
    }: {
        children: React.ReactNode
    }
) {
    return (
        <main>
            <SideBar/>

            <br/>
                {children}
            <br/>
        </main>
    );
}