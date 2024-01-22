import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";

import { ptBR } from "@material-ui/core/locale";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import ColorModeContext from "./layout/themeContext";

import Routes from "./routes";

const queryClient = new QueryClient();

const App = () => {
    const [locale, setLocale] = useState();

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const preferredTheme = window.localStorage.getItem("preferredTheme");
    const [mode, setMode] = useState(preferredTheme ? preferredTheme : prefersDarkMode ? "dark" : "light");

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        []
    );

    const theme = createTheme(
        {
            scrollbarStyles: {
                "&::-webkit-scrollbar": {
                    width: '8px',
                    height: '8px',
                },
                "&::-webkit-scrollbar-thumb": {
                    boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
                    backgroundColor: "#e8e8e8",
                },
            },
            scrollbarStylesSoft: {
                "&::-webkit-scrollbar": {
                    width: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: mode === "light" ? "#FFFFFF" : "#0F1B20",
                },
            },
            palette: {
                type: mode,
                primary: { main: mode === "light" ? "#34DD3B" : "#34DD3B" }, // Cor primária (por exemplo, botões)
                secondary: { main: mode === "light" ? "#34DD3B" : "#34DD3B" }, // Cor secundária
                text: {
                    primary: mode === "light" ? "#0F1B20" : "#FFFFFF", // Cor do texto
                },
                background: {
                    default: mode === "light" ? "#FFFFFF" : "#0F1B20", // Cor de fundo padrão
                    paper: mode === "light" ? "#FFFFFF" : "#1C2E36", // Cor de fundo do papel (por exemplo, caixas)
                },
                borderPrimary: mode === "light" ? "#34DD3B" : "#FFFFFF", // Cor da borda primária
                icon: {
                    primary: mode === "light" ? "#34DD3B" : "#34DD3B", // Cor dos ícones no modo escuro
                    // Adicione a cor verde apenas para o modo escuro
                    secondary: { main: mode === "dark" ? "#34DD3B" : undefined },
                  },
                dark: { main: mode === "light" ? "#1C2E36" : "#FFFFFF" }, // Cor escura
                light: { main: mode === "light" ? "#FFFFFF" : "#1C2E36" }, // Cor clara
                tabHeaderBackground: mode === "light" ? "#FFFFFF" : "#1C2E36", // Cor de fundo da aba de cabeçalho (por exemplo, menu de atendimentos)
                optionsBackground: mode === "light" ? "#F1F5F5" : "#0F1B20", // Cor de fundo das opções (por exemplo, aba de atendimentos)
                options: mode === "light" ? "#FFFFFF" : "#1C2E36", // Cor das opções (por exemplo, configurações)
                fontecor: mode === "light" ? "#0F1B20" : "#FFFFFF", // Cor da fonte
                fancyBackground: mode === "light" ? "#F1F5F5" : "#0F1B20", // Cor de fundo "fancy" (cor principal escura)
                bordabox: mode === "light" ? "#F1F5F5" : "#0F1B20", // Cor da borda acima de onde digita a mensagem
                newmessagebox: mode === "light" ? "#F1F5F5" : "#0F1B20", // Cor em torno da caixa de onde digita a mensagem
                inputdigita: mode === "light" ? "#FFFFFF" : "#1C2E36", // Cor da caixa de texto para atendimento onde digita a mensagem
                contactdrawer: mode === "light" ? "#FFFFFF" : "#1C2E36", // Cor do drawer de contatos
                announcements: mode === "light" ? "#FFFFFF" : "#1C2E36", // Cor dos anúncios
                login: mode === "light" ? "#FFFFF" : "#1C1C1C", // Cor do login
                announcementspopover: mode === "light" ? "#FFFFFF" : "#1C2E36", // Cor do popover de anúncios
                chatlist: mode === "light" ? "#1C2E36" : "#1C2E36", // Cor da lista de chat
                boxlist: mode === "light" ? "#E7ECEE" : "#2E4C59", // Cor da lista de caixas
                boxchatlist: mode === "light" ? "#ededed" : "#1C2E36", // Cor da lista de chat em caixa
                total: mode === "light" ? "#fff" : "#222", // Cor total
                messageIcons: mode === "light" ? "ff0378" : "#F3F3F3", // Cor dos ícones de mensagem
                inputBackground: mode === "light" ? "#FFFFFF" : "#1C2E36", // Cor de fundo da caixa de entrada
                barraSuperior: mode === "light" ? "linear-gradient(to right, #0F1B20, #1C2E36, #2E4C59)" : "linear-gradient(to right, #0F1B20, #1C2E36, #2E4C59)", // Gradiente da barra horizontal
                boxticket: mode === "light" ? "#1C2E36" : "#1C2E36", // Cor de fundo da caixa de imagem quando os tickets não estão selecionados
                listaInterno: mode === "light" ? "#E7ECEE" : "#2E4C59", // Cor da lista interna
                campaigntab: mode === "light" ? "#FFFFFF" : "#1C2E36", // Cor da aba de campanha
                fundoBackground: mode === "light" ? "#FFFFFF" : "#1C2E36", // Cor de fundo da área interna mediana
                corIconespaginas: mode === "light" ? "#34DD3B" : "#34DD3B", // Cor dos ícones das páginas
                corIconesbarra: mode === "light" ? "#1C2E36" : "#34DD3B", // Cor dos ícones da barra
                corTextobarra: mode === "light" ? "#0F1B20" : "#FFFFFF", // Cor do texto da barra
                corTextosuporte: mode === "light" ? "#0F1B20" : "#FFFFFF", // Cor do texto de suporte
                fundologoLateral: mode === "light" ? "linear-gradient(to right, #0F1B20, #0F1B20, #0F1B20)" : "linear-gradient(to right, #0F1B20, #0F1B20, #0F1B20)", // Gradiente do fundo do logo na lateral
                barraLateral: mode === "light" ? "linear-gradient(to right, #F1F5F5, #FFFFFF, #F1F5F5)" : "linear-gradient(to right, #0F1B20, #0F1B20, #0F1B20)", // Gradiente da barra vertical
                
            },
            mode,
        },
        locale
    );

    useEffect(() => {
        const i18nlocale = localStorage.getItem("i18nextLng");
        const browserLocale =
            i18nlocale.substring(0, 2) + i18nlocale.substring(3, 5);

        if (browserLocale === "ptBR") {
            setLocale(ptBR);
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem("preferredTheme", mode);
    }, [mode]);


    return (
        <ColorModeContext.Provider value={{ colorMode }}>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <Routes />
                </QueryClientProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default App;
