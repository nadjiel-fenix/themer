import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Switch,
  Slider,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Box,
  TablePagination,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useTheme, useLocale } from "../../contexts";

function ThemeShowcase() {
  const [selectValue, setSelectValue] = useState("");
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [radioValue, setRadioValue] = useState("option1");
  const [switchOn, setSwitchOn] = useState(true);
  const [sliderValue, setSliderValue] = useState<number[]>([20, 80]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { theme, muiTheme, setTheme } = useTheme();
  const { locale, setLocale } = useLocale();

  return (
    <div style={{ padding: 24 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">Material UI Theme Showcase</Typography>
          <Box>
            <IconButton
              color="inherit"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {muiTheme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
            <FormControl size="small" variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel id="locale-label">Locale</InputLabel>
              <Select
                labelId="locale-label"
                value={locale}
                onChange={(e) => {
                  setLocale?.(e.target.value);
                }}
                label="Locale"
              >
                <MenuItem value="en-us">English</MenuItem>
                <MenuItem value="pt-br">Português</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" gutterBottom>
            Typography
          </Typography>
          <Typography variant="body1">This is body1 text.</Typography>
          <Typography variant="body2">This is body2 text.</Typography>
          <Typography variant="caption">Caption text here</Typography>
          <Typography variant="overline">Overline text</Typography>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TablePagination
            count={2000}
            rowsPerPage={10}
            page={1}
            component="div"
            onPageChange={() => {}}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography variant="h4" gutterBottom>
            Calendar
          </Typography>
          <Box mt={2}>
            <DatePicker label="Select a date" />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" gutterBottom>
            Inputs
          </Typography>
          <TextField label="Text Field" fullWidth margin="normal" />
          <FormControl fullWidth margin="normal">
            <InputLabel>Select</InputLabel>
            <Select
              value={selectValue}
              label="Select"
              onChange={(e) => setSelectValue(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="opt1">Option 1</MenuItem>
              <MenuItem value="opt2">Option 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" gutterBottom>
            Controls
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkboxChecked}
                onChange={(e) => setCheckboxChecked(e.target.checked)}
              />
            }
            label="Checkbox"
          />
          <RadioGroup
            value={radioValue}
            onChange={(e) => setRadioValue(e.target.value)}
            row
          >
            <FormControlLabel
              value="option1"
              control={<Radio />}
              label="Radio 1"
            />
            <FormControlLabel
              value="option2"
              control={<Radio />}
              label="Radio 2"
            />
          </RadioGroup>
          <FormControlLabel
            control={
              <Switch
                checked={switchOn}
                onChange={(e) => setSwitchOn(e.target.checked)}
              />
            }
            label="Switch"
          />
          <Slider
            value={sliderValue}
            onChange={(_, newVal) => setSliderValue(newVal as number[])}
            valueLabelDisplay="auto"
            min={0}
            max={100}
            sx={{ mt: 3 }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" gutterBottom>
            Card
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="h5">Card Title</Typography>
              <Typography>This is some card content.</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => setDialogOpen(true)}>
                Open Dialog
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography variant="h4" gutterBottom>
            Table
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Age</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Alice</TableCell>
                  <TableCell>24</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bob</TableCell>
                  <TableCell>30</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography variant="h4" gutterBottom>
            Actions
          </Typography>
          <Button variant="contained" onClick={() => setSnackbarOpen(true)}>
            Show Snackbar
          </Button>
          <Button
            variant="outlined"
            onClick={() => setDialogOpen(true)}
            sx={{ ml: 2 }}
          >
            Show Dialog
          </Button>
        </Grid>
      </Grid>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Dialog</DialogTitle>
        <DialogContent>This is a simple dialog content.</DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message="This is a snackbar!"
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={() => setSnackbarOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
}

export default ThemeShowcase;
