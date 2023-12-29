import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TextField,
  Button,
  TablePagination,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Grid,
} from '@mui/material';

const Home = () => {
  const [games, setGames] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://139.59.32.22:3010/game/gameslist');
        setGames(response.data);
        setFilteredGames(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = () => {
    if (!searchValue) {
      setFilteredGames(games);
    } else {
      const filtered = games.filter(
        (game) =>
          game.game_name.toLowerCase().includes(searchValue.toLowerCase()) ||
          game.status.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredGames(filtered);
    }
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredGames.length - page * rowsPerPage);

  return  (
    <Grid container style={{ height: '100%', width: '100%' }}>
  <Button variant="contained" color="primary" size="small">
  <Link to={'/Login'}>login</Link>
  </Button>

      <Grid item xs={12}>
        <Box display="flex" flexDirection="column" height="100%" p={2}>
          <TextField
            label="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            variant="outlined"
            margin="dense"
            size="small"
            sx={{ mb: 2 }}
          />
          <Button onClick={handleSearch} variant="contained" color="primary" size="small">
            Search
          </Button>

          <TableContainer component={Paper} elevation={4} sx={{ mt: 2, width: '100%' }}>
            <Table sx={{ minWidth: '100%' }}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>Game ID</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Game Name</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Start Time</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>End Time</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Winning Number</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Winning Amount</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredGames
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((game) => (
                    <TableRow key={game.game_id}>
                      <TableCell>{game.game_id}</TableCell>
                      <TableCell>{game.game_name}</TableCell>
                      <TableCell>{game.start_time}</TableCell>
                      <TableCell>{game.end_time}</TableCell>
                      <TableCell>{game.winningNumber}</TableCell>
                      <TableCell>{game.winningAmount}</TableCell>
                      <TableCell>
                        <Button variant="outlined" color="primary">
                          {game.status}
                        </Button>
                      </TableCell>
                      <TableCell>{game.date}</TableCell>
                    </TableRow>
                  ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={8} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredGames.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ mt: 2 }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
