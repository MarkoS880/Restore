import { Button, ButtonGroup, Container, Typography, Alert } from "@mui/material";
import { useLazyGet400ErrorQuery, useLazyGet401ErrorQuery, useLazyGet404ErrorQuery, useLazyGet500ErrorQuery, useLazyGetValidationErrorQuery } from "./errorApi";

export default function AboutPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    
    const [trigger400Error] = useLazyGet400ErrorQuery();
    const [trigger401Error] = useLazyGet401ErrorQuery();
    const [trigger404Error] = useLazyGet404ErrorQuery();
    const [trigger500Error] = useLazyGet500ErrorQuery();
    const [triggerValidationError] = useLazyGetValidationErrorQuery();

    const getValidationError = async () =>
    {
        try
        {
            await triggerValidationError().unwrap();
        }
        catch (error: unknown)
        {
            if (error && typeof error === 'object' && 'message' in error && typeof (error as { message: unknown }).message === 'string')
            {
                const errorArray = (error as { message: string }).message.split(',');
                setValidationErrors(errorArray);
            }
        }
    }

    return (
        <Container maxWidth='lg'>
            <Typography gutterBottom variant="h3">Errors for testing</Typography>
            <ButtonGroup fullWidth> 
                <Button variant="contained" onClick={() => trigger400Error().catch(err => console.log(err))}>Test error 400</Button>
                <Button variant="contained" onClick={() => trigger401Error().catch(err => console.log(err))}>Test error 401</Button>
                <Button variant="contained" onClick={() => trigger404Error().catch(err => console.log(err))}>Test error 404</Button>
                <Button variant="contained" onClick={() => trigger500Error().catch(err => console.log(err))}>Test error 500</Button>
                <Button variant="contained" onClick={getValidationError}>Test valiadtion error </Button>
            </ButtonGroup>
            {validationErrors.length > 0 && (
                <Alert severity="error">
                    <AllertTitle>Validation errors</AllertTitle>
                    <List>
                        {validationErrors.map(err => (
                            <ListItem key={err}>{ err}</ListItem>
                        ))}
                    </List>
                </Alert>
            )}
        </Container>
    )
}