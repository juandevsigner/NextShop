import React, { FC } from "react";
import Head from "next/head";
import { Box } from "@mui/material";
import { JsxElement } from "typescript";
interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
}

export const AuthLayout: FC<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="calc(100vh - 200px)"
          >
            {children}
          </Box>
        </Box>
      </main>
    </>
  );
};
