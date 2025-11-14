import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

export default function PurchaseConfirmationEmail({ productName, downloadUrl, customerName }) {
  return (
    <Html>
      <Head />
      <Preview>Your purchase of {productName} is ready!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank you for your purchase!</Heading>
          <Text style={text}>
            Hi {customerName || 'there'},
          </Text>
          <Text style={text}>
            Thank you for purchasing <strong>{productName}</strong>. Your digital product is ready to download!
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={downloadUrl}>
              Download Now
            </Button>
          </Section>
          <Text style={text}>
            If you have any questions or issues, please don't hesitate to contact us.
          </Text>
          <Text style={footer}>
            This download link will remain active for 30 days.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  textAlign: 'left',
  padding: '0 20px',
};

const buttonContainer = {
  textAlign: 'center',
  margin: '32px 0',
};

const button = {
  backgroundColor: '#000',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'inline-block',
  padding: '12px 20px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '0 20px',
};
