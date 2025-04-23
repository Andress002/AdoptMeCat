import weka.core.Instances;
import weka.core.converters.ConverterUtils.DataSource;
import weka.classifiers.Classifier;

public class WekaPredictor {
    public static void main(String[] args) throws Exception {
        String modelPath = args[0]; // ruta al archivo .model
        String dataPath = args[1];  // ruta al archivo .arff

        // Cargamos el modelo
        Classifier cls = (Classifier) weka.core.SerializationHelper.read(modelPath);

        // Cargamos los datos
        Instances data = new DataSource(dataPath).getDataSet();

        // Imprimir los datos cargados
        System.out.println("Datos cargados: " + data.toString());

        // Establecemos la clase a predecir (última columna)
        if (data.classIndex() == -1) {
            data.setClassIndex(data.numAttributes() - 1);
        }

        // Definir un umbral de confianza
        double threshold = 0.5; // Umbral para la probabilidad (por ejemplo, 50%)

        // Clasificamos cada instancia y obtenemos las probabilidades
        for (int i = 0; i < data.numInstances(); i++) {
            double[] distribution = cls.distributionForInstance(data.instance(i));
            int indexSi = data.classAttribute().indexOfValue("si");
            int indexNo = data.classAttribute().indexOfValue("no");

            double probSi = distribution[indexSi];
            double probNo = distribution[indexNo];

            // Si probSi es 100%, aseguramos que probNo sea 0%
            if (probSi > 0.999) {
                probSi = 1.0;
                probNo = 0.0;
            } 
            // Si probNo es 100%, aseguramos que probSi sea 0%
            else if (probNo > 0.999) {
                probNo = 1.0;
                probSi = 0.0;
            }

            String resultado;
            if (probSi > probNo && probSi >= threshold) {
                resultado = "si";
            } else if (probNo > probSi && probNo >= threshold) {
                resultado = "no";
            } else {
                resultado = "Indeterminado";  // Si ninguna de las probabilidades supera el umbral
            }

            System.out.println("resultado: " + resultado);
            System.out.println("si: " + probSi * 100);
            System.out.println("no: " + probNo * 100);
            System.out.printf("Total (si + no): %.2f%%\n", (probSi + probNo) * 100); // Verificación
        }
    }
}
