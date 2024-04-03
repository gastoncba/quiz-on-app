import { useNavigate } from 'react-router-dom';
import { Paragraph, Button } from '../../components';

import { Grid, Box } from '@mui/material';
import { motion } from 'framer-motion';

interface LandingProps {}

export const LandingScreen: React.FC<LandingProps> = () => {
  const navigate = useNavigate();

  return (
    <Grid container justifyContent={'center'} sx={{ py: 2 }}>
      <Grid item xs={12} sm={8} md={6} lg={5} xl={5}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Paragraph text={'Quiz On'} align="center" variant="h1" />
        </motion.h1>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paragraph
            text={'Empeza a constestar nuestros quiz!!'}
            align="center"
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <Button
              title="Empezar"
              style={{
                ':hover': {
                  bgcolor: 'primary.dark',
                },
              }}
              onClick={() => navigate('/home')}
            />
          </Box>
        </motion.div>
      </Grid>
    </Grid>
  );
};
