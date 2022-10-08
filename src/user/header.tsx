import { Header } from "../components/Header";

export default <Header links={[
            {
                link: "/user/events",
                name: "События"
            },
            {
                link: "/user/clan",
                name: "Мой клан"
            },
            {
                link: "/user/leaderboard",
                name: "Лидерборд"
            },
            {
                link: "/user/clan-war",
                name: "Битва кланов"
            },
            {
                link: "/user/marketplace",
                name: "Маркетплейс"
            },
            {
                link: "/user/transaction-history",
                name: "История транзакций"
            }
        ]} name={"Пользователь Юзер"}/>
