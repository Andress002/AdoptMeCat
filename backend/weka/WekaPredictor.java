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
        double threshold = 0.7; // Umbral para la probabilidad (por ejemplo, 70%)

        // Clasificamos cada instancia y obtenemos las probabilidades
        for (int i = 0; i < data.numInstances(); i++) {
            double[] distribution = cls.distributionForInstance(data.instance(i));
            int indexSi = data.classAttribute().indexOfValue("si");
            int indexNo = data.classAttribute().indexOfValue("no");

            double probSi = distribution[indexSi];
            double probNo = distribution[indexNo];

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
        }
    }
}
