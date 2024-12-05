import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Post, Pagination } from "~/components/components";
import { Colors, HeaderHeight } from "~/constants/constants";
import { Exhibit } from "~/types/types";

interface ExhibitsListProps {
  exhibits: Exhibit[] | undefined;
  loading: boolean;
  page: number;
  lastPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  onDeleteExhibit: (id: number) => void;
  error?: string;
}

const ExhibitsList: React.FC<ExhibitsListProps> = ({
  exhibits = [],
  loading,
  error,
  page,
  lastPage,
  onPageChange,
  onDeleteExhibit,
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: `calc(100vh - 2*${HeaderHeight}px)`,
          overflowY: "auto",
          pt: 2,
        }}
      >
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Typography color="error">Error loading exhibits.</Typography>
          </Box>
        )}
        {!loading && exhibits?.length === 0 && !error && (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Typography>No exhibits found.</Typography>
          </Box>
        )}
        {!loading && exhibits?.map((exhibit) => (
          <Box key={exhibit.id} mb={3} width="100%" display="flex" justifyContent="center">
            <Post onDelete={onDeleteExhibit} {...exhibit} />
          </Box>
        ))}
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        pt={2}
        height={HeaderHeight}
        sx={{
          backgroundColor: Colors.backgroundPrimary,
        }}
      >
        <Pagination page={page} lastPage={lastPage} onChange={onPageChange} />
      </Box>
    </>
  );
};

export { ExhibitsList };
