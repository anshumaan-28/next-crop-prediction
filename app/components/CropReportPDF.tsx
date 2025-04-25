import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { CropRecommendation, FarmData } from "@/types/types";

// Register fonts - using a more reliable font source
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
      fontWeight: 300,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
      fontWeight: 500,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: 700,
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Roboto",
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Roboto",
    fontWeight: 700,
    marginBottom: 10,
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Roboto",
    fontWeight: 400,
    color: "#666666",
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Roboto",
    fontWeight: 700,
    marginBottom: 10,
    color: "#2563eb",
    padding: 5,
    backgroundColor: "#eff6ff",
  },
  farmDetailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  farmDetailItem: {
    width: "50%",
    marginBottom: 15,
    padding: 10,
  },
  farmDetailLabel: {
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: 500,
    color: "#666666",
    marginBottom: 4,
  },
  farmDetailValue: {
    fontSize: 14,
    fontFamily: "Roboto",
    fontWeight: 400,
    color: "#1a1a1a",
  },
  cropCard: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f8fafc",
    borderRadius: 8,
  },
  cropName: {
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: 700,
    marginBottom: 8,
    color: "#1a1a1a",
  },
  cropType: {
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: 500,
    color: "#2563eb",
    marginBottom: 8,
  },
  cropDescription: {
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: 400,
    color: "#4b5563",
    marginBottom: 10,
  },
  subsectionTitle: {
    fontSize: 14,
    fontFamily: "Roboto",
    fontWeight: 700,
    marginBottom: 6,
    color: "#374151",
  },
  detailsGrid: {
    marginTop: 10,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 10,
    fontFamily: "Roboto",
    fontWeight: 500,
    color: "#6b7280",
    width: "30%",
  },
  detailValue: {
    fontSize: 10,
    fontFamily: "Roboto",
    fontWeight: 400,
    color: "#374151",
    width: "70%",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    color: "#9ca3af",
    fontSize: 10,
    fontFamily: "Roboto",
    fontWeight: 400,
  },
  divider: {
    borderBottom: 1,
    borderBottomColor: "#e5e7eb",
    marginVertical: 15,
  },
});

interface CropReportPDFProps {
  farmData: FarmData;
  cropRecommendations: CropRecommendation[];
}

const CropReportPDF = ({
  farmData,
  cropRecommendations,
}: CropReportPDFProps) => {
  // Format date in a more reliable way
  const formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Crop Recommendation Report</Text>
          <Text style={styles.subtitle}>Generated on {formattedDate}</Text>
        </View>

        {/* Farm Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Farm Details</Text>
          <View style={styles.farmDetailsGrid}>
            <View style={styles.farmDetailItem}>
              <Text style={styles.farmDetailLabel}>Soil Type</Text>
              <Text style={styles.farmDetailValue}>{farmData.soilType}</Text>
            </View>
            <View style={styles.farmDetailItem}>
              <Text style={styles.farmDetailLabel}>Region</Text>
              <Text style={styles.farmDetailValue}>
                {farmData.region}, {farmData.district}
              </Text>
            </View>
            <View style={styles.farmDetailItem}>
              <Text style={styles.farmDetailLabel}>Water Source</Text>
              <Text style={styles.farmDetailValue}>{farmData.waterSource}</Text>
            </View>
            <View style={styles.farmDetailItem}>
              <Text style={styles.farmDetailLabel}>Farm Area</Text>
              <Text style={styles.farmDetailValue}>
                {farmData.farmArea} acres
              </Text>
            </View>
          </View>
        </View>

        {/* Crop Recommendations Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Crops</Text>
          {cropRecommendations.map((crop, index) => (
            <View key={index} style={styles.cropCard}>
              <Text style={styles.cropName}>{crop.name}</Text>
              <Text style={styles.cropType}>{crop.type}</Text>
              <Text style={styles.cropDescription}>{crop.description}</Text>

              <View style={styles.divider} />

              <Text style={styles.subsectionTitle}>Care Instructions</Text>
              <Text style={styles.cropDescription}>{crop.care}</Text>

              <View style={styles.divider} />

              <Text style={styles.subsectionTitle}>Expected Yield</Text>
              <Text style={styles.cropDescription}>{crop.yield}</Text>

              <View style={styles.divider} />

              <Text style={styles.subsectionTitle}>Subsidy Information</Text>
              <View style={styles.detailsGrid}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>MSP:</Text>
                  <Text style={styles.detailValue}>{crop.subsidies.msp}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Additional Input:</Text>
                  <Text style={styles.detailValue}>
                    {crop.subsidies.additionalInput}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Effective Price:</Text>
                  <Text style={styles.detailValue}>
                    {crop.subsidies.effectivePrice}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Input Scheme:</Text>
                  <Text style={styles.detailValue}>
                    {crop.subsidies.inputScheme}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Major Scheme:</Text>
                  <Text style={styles.detailValue}>
                    {crop.subsidies.majorScheme}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Other Subsidies:</Text>
                  <Text style={styles.detailValue}>
                    {crop.subsidies.otherSubsidies}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          This report is generated by Next Crop Prediction System •{" "}
          {new Date().getFullYear()}
        </Text>
      </Page>
    </Document>
  );
};

export default CropReportPDF;
