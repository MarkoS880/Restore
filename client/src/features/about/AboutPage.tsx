import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import { useLazyGet400ErrorQuery, useLazyGet401ErrorQuery, useLazyGet404ErrorQuery, useLazyGet500ErrorQuery, useLazyGetValidationErrorQuery } from "./errorApi";

export default function AboutPage() {
    const [trigger400Error] = useLazyGet400ErrorQuery();
    const [trigger401Error] = useLazyGet401ErrorQuery();
    const [trigger404Error] = useLazyGet404ErrorQuery();
    const [trigger500Error] = useLazyGet500ErrorQuery();
    const [triggerValidationError] = useLazyGetValidationErrorQuery();
    return (
        <Container maxWidth='lg'>
            <Typography gutterBottom variant="h3">Errors for testing</Typography>
            <ButtonGroup fullWidth> 
                <Button variant="contained" onClick={() => trigger400Error().catch(err => console.log(err))}>Test error 400</Button>
                <Button variant="contained" onClick={() => trigger401Error().catch(err => console.log(err))}>Test error 401</Button>
                <Button variant="contained" onClick={() => trigger404Error().catch(err => console.log(err))}>Test error 404</Button>
                <Button variant="contained" onClick={() => trigger500Error().catch(err => console.log(err))}>Test error 500</Button>
                <Button variant="contained" onClick={() => triggerValidationError().catch(err => console.log(err))}>Test valiadtion error </Button>
            </ButtonGroup>
        </Container>
    )
}