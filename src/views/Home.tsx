/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Box, Toolbar, Typography } from "@mui/material";
import { Login } from "./Login";
import { useState } from "react";
import { Singup } from "./Singup";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Icon from "@mui/material/Icon";

export const Home = () => {
    const [homeForm, setHomeForm] = useState<"login" | "singup">("login");
    return (
        <Box
            css={css`
                width: 100vw;
                min-height: 100vh;
                height: auto;
                background: linear-gradient(
                    270deg,
                    rgb(171, 102, 255) 0%,
                    rgb(20, 241, 149) 101.39%
                );
                padding-bottom: 5vh;
            `}
        >
            <Toolbar
                css={css`
                    background: #fff;
                    -webkit-box-shadow: 0px 20px 35px -11px rgba(66, 68, 90, 1);
                    -moz-box-shadow: 0px 20px 35px -11px rgba(66, 68, 90, 1);
                    box-shadow: 0px 20px 35px -11px rgba(66, 68, 90, 1);
                    display: flex;
                    justify-content: space-between;
                `}
            >
                <img
                    src="/solpos.png"
                    alt="Solpos"
                    css={css`
                        max-width: 150px;
                        width: 100%;
                        height: auto;
                        left: 1vw;
                        top: 1vw;
                    `}
                />
                <Box
                    css={css`
                        display: flex;
                        gap: 10px;
                    `}
                >
                    <a href="https://twitter.com/real_solpos">
                        <TwitterIcon
                            css={css`
                                font-size: 2.5rem;
                            `}
                        />
                    </a>
                    <a href="https://www.instagram.com/real_solpos/">
                        <InstagramIcon
                            css={css`
                                font-size: 2.5rem;
                            `}
                        />
                    </a>
                </Box>
            </Toolbar>

            <Typography
                css={css`
                    color: #fff;
                    text-transform: uppercase;
                    font-size: 5vw;
                    font-weight: 500;
                    word-spacing: 1vw;
                    text-align: center;
                    padding-top: 6vh;
                    text-shadow: 3px 4px 11px rgba(66, 68, 90, 1);
                `}
                variant="h1"
            >
                Welcome to solpos
            </Typography>
            <Box
                css={css`
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                `}
            >
                {homeForm === "login" && (
                    <Login handleSingupClick={() => setHomeForm("singup")} />
                )}
                {homeForm === "singup" && (
                    <Singup handleLoginClick={() => setHomeForm("login")} />
                )}
            </Box>
        </Box>
    );
};
