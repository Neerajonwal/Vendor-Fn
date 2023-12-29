import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Box, Stack, padding } from "@mui/system";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Menu,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { FormControl } from "@mui/base";
function generatePatternArray() {
  const numberArray = Array.from({ length: 100 }, (_, index) =>
    (index + 1).toString().padStart(2, "0")
  );

  const letterAArray = Array.from(
    { length: 10 },
    (_, index) => `A${index < 9 ? index + 1 : 0}`
  );
  const letterBArray = Array.from(
    { length: 10 },
    (_, index) => `B${index < 9 ? index + 1 : 0}`
  );

  const resultArray = numberArray.concat(letterAArray).concat(letterBArray);

  return resultArray;
}

const BettingGame = () => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [numberAndLetterArr, setNumberAndLetterArr] = useState([]);
  const [coinsArr, setCoinsArr] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let timer = null;

    if (isTimerRunning) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isTimerRunning]);

  const handleNumberClick = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((num) => num !== number));
    } else {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const handleConfirmBet = () => {
    // Logic to handle confirmed bet
    console.log("Bet confirmed");
  };

  const handleCancelBet = () => {
    setSelectedNumbers([]);
    // Logic to handle canceled bet
    console.log("Bet canceled");
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  useEffect(() => {
    setNumberAndLetterArr(generatePatternArray());
    const dummyCoins = ["1", "5", "10", "50", "100", "500", "1000", "5000"];
    setCoinsArr(dummyCoins);
  }, []);
  return (
    <>
      <Paper
        elevation={1}
        sx={{
          display: "flex",
          width: "100%",
          height: "auto",
          justifyContent: "space-between",
          padding: "10px",
          gap: "10px",
          // border:'1px solid red'
        }}
      >
        {/*//? number section  */}
        <Box
          sx={{
            flex: 2,
          }}
        >
          <Stack direction={"column"} spacing={2}>
            <Paper
              sx={{
                width: "90%",
                p: "10px",
              }}
              elevation={1}
            >
              <Stack spacing={3} direction={"row"}>
                <Typography>Points:5000</Typography>
                <Typography>Time Left :1min</Typography>
                <Typography>Winner :2</Typography>
              </Stack>
            </Paper>
            <Grid container spacing={0.5} columns={10}>
              {numberAndLetterArr.length > 0 &&
                numberAndLetterArr.map((current, index) => (
                  <Grid item xs={1} key={index}>
                    <Button
                      size="md"
                      sx={{
                        borderRadius: "100%",
                        width: "30px",
                        height: "30px",
                      }}
                      variant={
                        selectedNumbers.includes(index + 1)
                          ? "contained"
                          : "outlined"
                      }
                      onClick={() => handleNumberClick(index + 1)}
                      color={
                        selectedNumbers.includes(index + 1)
                          ? "warning"
                          : "primary"
                      }
                    >
                      {current === "100" ? "00" : current}
                    </Button>
                  </Grid>
                ))}
            </Grid>
          </Stack>
        </Box>
        {/*//? choice selection section  */}
        <Box
          sx={{
            flex: 1,
          }}
        >
          {/*//? button and score section  */}
          <Stack direction={"row"} spacing={3} mb="2rem">
            <Stack direction={"column"} spacing={2}>
              <Button color="error" variant="contained">
                Cancell ALL
              </Button>
              <Button color="error" variant="contained">
                Cancell Bet
              </Button>
            </Stack>
            <Typography>100</Typography>
          </Stack>
          {/* //**coin seleciton box  */}
          <Grid container spacing={1} columns={4} mt={"2px"} p={"5px"}>
            {coinsArr.length > 0 &&
              coinsArr.map((curCoin, index) => {
                return (
                  <Grid item xs={1} key={index}>
                    <Button variant="outlined">{curCoin}</Button>
                  </Grid>
                );
              })}
          </Grid>
          {/* //**CM CJ button  */}
          <Button
            color="warning"
            variant="contained"
            size="md"
            sx={{ mt: "1rem", mb: "5rem" }}
            onClick={handleClick}
          >
            CM/CJ
          </Button>
          {/* cm cj content  */}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Box sx={{ width: "350px", height: "200px", p: "5px" }}>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="cm"
                    control={<Radio />}
                    label="Combined Maker"
                  />
                  <FormControlLabel
                    value="cj"
                    control={<Radio />}
                    label="Jodi Maker"
                  />
                </RadioGroup>
              </FormControl>
              <Stack direction={"row"} spacing={2}>
                <TextField variant="standard" label="Value A" />
                <TextField variant="standard" label="Point" />
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Self"
                  />
                </FormGroup>
              </Stack>
              {/* value section  */}
              <Stack
              direction={'row'}
              spacing={2}
              sx={{mt:'1rem'}}
              >
                <Typography>
                  Total : 36
                </Typography>
                <Typography>
                   360
                </Typography>
              </Stack>
              {/* action buttons  */}
              <Stack
              direction={'row'}
              spacing={3}
              sx={{mt:'1rem'}}
              >
                <Button 
                color="warning"
                size="md"
                variant="contained"
                >
                  Calulate
                </Button>
                <Button 
                color="warning"
                size="md"
                variant="contained"
                onClick={handleClose}
                >
                  Close
                </Button>
              </Stack>
            </Box>
          </Menu>

          <Stack
            direction={"row"}
            spacing={3}
            //  sx={{mt:'2rem'}}
          >
            <Button variant="contained" color="warning">
              Take
            </Button>

            <Button variant="contained" color="warning">
              Bet Ok
            </Button>
          </Stack>
        </Box>
      </Paper>
    </>
  );
};

export default BettingGame;
