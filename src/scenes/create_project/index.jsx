import { Box, Grid, TextField, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { useState, useEffect } from "react";
import React from "react";
import Header from "../../components/Header";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import Textfield from "../../components/FormsUI/Textfield";
import Select from "../../components/FormsUI/Select";
import mockPlatform from "../../data/mockPlatform.json";
import currency from "../../data/currency.json";
import DateTimePicker from "../../components/FormsUI/DateTimePicker";
import Button from "../../components/FormsUI/Button";


const today = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getUTCMonth() + 1
    mm = mm.toString();
    if (mm.toString().length < 2) {
        mm = "0"+mm
    }
    var yy = today.getFullYear();
    today = yy + "-" + mm + "-" + dd;
    return today;
}

const initValues = {
    id: 0,
    author: "This user",
    shortName: "",
    description:"",
    platform:"",
    peopleMin: "",
    peopleMax: "",
    startDate: today(),
    endDate: "",
    currency:"",
    cost: "",
};

const validationForm = Yup.object().shape({
    id: Yup.number(),
    author: "",
    shortName: Yup.string()
        .required("Required"),
    description: Yup.string()
        .required("Description is required"),
    platform: '',
    peopleMin: Yup.number().positive().integer().required("Minimum number of people"),
    peopleMax: Yup.number().positive().integer().required("Maximum number of people"),
    startDate: "",
    endDate: Yup.date().min(new Date()).required("End date is required"),
    currency: Yup.string().required("Currency"),
    cost: Yup.number().required("Cost of project"),
});

function CreateProject() {
    
    const [values, setValues] = useState(initValues)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return(
        <Box m = "14px">
        <Box display="flex" justifyContent="center" alignItems="center" color={colors.blueAccent[300]}>
            <Header title="Create project" icon={AddBoxOutlinedIcon}>

            </Header>
        </Box>
        <Box>
            <Formik 
            initialValues= {{...initValues}}
            validationSchema={validationForm}
            onSubmit={values => {
                console.log(values);
            }}>
                <Form>

                    <Grid container spacing= {2} justify="center">

                        <Grid item xs= "auto">
                            <Typography>
                                Project description
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Textfield
                            name = "shortName"
                            label = "Short project description"
                            color = "secondary"
                            >
                                
                            </Textfield>
                        </Grid>

                        <Grid item xs={12}>
                            <Textfield
                            name = "description"
                            label = "Here you should fully describe your expectations, the result you want to see, everything about project"
                            size = 'medium'
                            multiline = {true}
                            minRows = "4"
                            maxRows = "8"
                            color = "secondary">
                            </Textfield>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography>
                                Project details
                            </Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Textfield
                            name = "peopleMin"
                            label = "Minimum people count"
                            color = "secondary">
                                
                            </Textfield>
                        </Grid>

                        <Grid item xs={4}>
                            <Textfield
                            name = "peopleMax"
                            label = "Maximum people count"
                            color = "secondary">
                                
                            </Textfield>
                        </Grid>
                        <Grid item xs={4}>
                        <Select
                            name="platform"
                            label="Country"
                            options={mockPlatform}
                            color = "secondary"
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <Textfield
                            name="cost"
                            label="Cost amount"
                            color = "secondary"
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <Select
                            name="currency"
                            label="Choose cryptocurrency"
                            options={currency}
                            color = "secondary"
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <DateTimePicker 
                            name="endDate"
                            label="Date of project ending"
                            color = "secondary"
                        />
                        </Grid>
                        <Grid item xs={4}>
                          
                        </Grid>
                        <Grid item xs={4}>
                          <Button
                            color = "primary"
                            
                            >
                            Create project
                          </Button>
                        </Grid>
                    </Grid>

                </Form>
            </Formik>
            </Box>
        </Box>
    );
};

export default CreateProject;