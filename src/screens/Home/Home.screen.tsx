import { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
  Paragraph,
  showToast,
  Loader,
  Button,
  GridList,
  IconButton,
  Icon,
  Modal,
  Form,
  Input,
} from '../../components';
import { Category } from '../../models';
import { CategoryServices } from '../../services';
import { styles } from '../../settings';

interface HomeProps {}

export const HomeScreen: React.FC<HomeProps> = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { green, blueberry, favorite, star, red } = styles.color;
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await CategoryServices.getCategories();
        setCategories(categories);
        setLoading(false);
      } catch (error: any) {
        showToast('Error al consultar las categorias', 'error');
      }
    };

    getCategories();
  }, []);

  const renderColor = (categoryName: string) => {
    switch (categoryName) {
      case 'Ciencia':
        return blueberry;
      case 'Historia':
        return green;
      case 'Arte':
        return favorite;
      case 'Geografía':
        return star;
      case 'Entretenimiento':
        return red;
      default:
        return 'primary.dark';
    }
  };
  const sendQuestion = async (value: any) => {
    console.log(value);
  };
  return (
    <>
      <motion.h3
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Paragraph text={'Categorias'} variant="h3" align="center" />
      </motion.h3>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paragraph
          text={'Selecciona una categoria para comenzar!'}
          align="center"
        />
      </motion.div>
      {loading ? (
        <Loader />
      ) : (
        <Container maxWidth="sm">
          <GridList
            sxContainer={{ py: 2 }}
            items={categories}
            renderItem={(item: Category) => (
              <Button
                key={item.id}
                title={item.name}
                onClick={() =>
                  navigate('/questionnaire', { state: { category: item } })
                }
                style={{
                  bgcolor: renderColor(item.name),
                  width: '100%',
                  ':hover': {
                    bgcolor: renderColor(item.name),
                  },
                }}
              />
            )}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              py: 2,
              alignItems: 'center',
              columnGap: 1,
            }}
          >
            <IconButton
              icon={<Icon type="PLUS" />}
              buttonStyle={{
                ':hover': { bgcolor: 'primary.main' },
              }}
              size="small"
              onClick={() => setOpen(true)}
            />
            <Paragraph text={'Colabora con una pregunta'} />
          </Box>
        </Container>
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Pregunta"
        fullWidth
      >
        <Form
          inputs={[
            {
              type: 'text',
              label: 'Pregunta',
              initialValue: { question: '' },
              multiline: true,
            },
          ]}
          submitText="Guardar"
          onAction={sendQuestion}
        >
          <Input value={''} setValue={() => {}} size="small" label="Opcion" />
        </Form>
      </Modal>
    </>
  );
};
