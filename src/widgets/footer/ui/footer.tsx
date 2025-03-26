import { Flex, Link, Text } from '@radix-ui/themes';
import styles from './footer.module.scss';

export const Footer = () => {
    return (
        <footer className={styles.root}>
            <Flex justify="between" align="center" wrap="wrap">
                <Text as="p" size="2" className={styles.text}>
                    Сделано с ❤ и 2 чашками кофе.
                </Text>
                <Text as="p" size="2">
                    © 2025 Todos for Mindbox.
                </Text>
                <Flex direction="column" align="center">
                    <Text size="2">Telegram: @zzzywo</Text>
                    <Link href="https://hh.ru/resume/35840d29ff096b81760039ed1f473356596b59?from=share_ios">
                        Мое резюме на HH.ru
                    </Link>
                </Flex>
            </Flex>
        </footer>
    );
};
