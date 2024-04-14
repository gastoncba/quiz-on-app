import { useNavigate } from 'react-router-dom';
import { Grid, Box } from '@mui/material';

import { Paragraph, Button, Animation } from '../../components';

interface LandingProps {}

export const LandingScreen: React.FC<LandingProps> = () => {
  const navigate = useNavigate();

  return (
    <Grid container justifyContent={'center'} sx={{ py: 2 }}>
      <Grid item xs={12} sm={8} md={6} lg={5} xl={5}>
        <Animation type="SLICE">
          <Paragraph text={'Quiz On'} align="center" variant="h1" />
        </Animation>
        <Animation type="BOOM">
          <Paragraph
            text={'Empeza a constestar nuestros quiz!!'}
            align="center"
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <Button
              title="Empezar"
              colorHover="primary.dark"
              onClick={() => navigate('/home')}
              animation
            />
          </Box>
        </Animation>
      </Grid>
    </Grid>
  );
};
