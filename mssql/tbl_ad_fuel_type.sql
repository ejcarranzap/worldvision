
IF OBJECT_ID('fn_seq_tbl_ad_fuel_type') IS NOT NULL DROP FUNCTION fn_seq_tbl_ad_fuel_type
IF OBJECT_ID('sp_tbl_ad_fuel_type') IS NOT NULL DROP PROCEDURE sp_tbl_ad_fuel_type
GO
CREATE FUNCTION fn_seq_tbl_ad_fuel_type()
  RETURNS INT
AS
BEGIN
  DECLARE @ID INT = 0
  SELECT @ID = ISNULL(MAX(Id_fuel_type),0)+1 FROM tbl_ad_fuel_type
  RETURN @ID
END
GO
CREATE PROCEDURE sp_tbl_ad_fuel_type
  @ACTION NVARCHAR(40) = NULL,
  @RAWPRM NVARCHAR(255) = NULL,
  @Id_fuel_type INT = NULL,
  @code NVARCHAR(20) = NULL,
  @name NVARCHAR(50) = NULL,
  @date_mod DATETIME = NULL,
  @user_mod NVARCHAR(20) = NULL,
  @active INT = NULL
AS
SET NOCOUNT ON
  DECLARE @MSG NVARCHAR(MAX) = ''
  
  IF ISNULL(@ACTION,'') = 'S'
  BEGIN
    SELECT
    A.Id_fuel_type,
    A.code,
    A.name,
    A.date_mod,
    A.user_mod,
    A.active
    FROM tbl_ad_fuel_type A WHERE 1 = 1
    AND (COALESCE(@Id_fuel_type,A.Id_fuel_type) = A.Id_fuel_type OR @Id_fuel_type IS NULL)
    AND (COALESCE(@code,A.code) = A.code OR @code IS NULL)
    AND (COALESCE(@name,A.name) = A.name OR @name IS NULL)
    AND (COALESCE(@date_mod,A.date_mod) = A.date_mod OR @date_mod IS NULL)
    AND (COALESCE(@user_mod,A.user_mod) = A.user_mod OR @user_mod IS NULL)
    AND (COALESCE(@active,A.active) = A.active OR @active IS NULL)
  END
  IF ISNULL(@ACTION,'') = 'I'
  BEGIN 
    BEGIN TRY
    BEGIN TRAN
      SET IDENTITY_INSERT tbl_ad_fuel_type ON
      
      SET @Id_fuel_type = dbo.fn_seq_tbl_ad_fuel_type()
      INSERT INTO tbl_ad_fuel_type(
      Id_fuel_type,
      code,
      name,
      date_mod,
      user_mod,
      active
      )
      VALUES(
      @Id_fuel_type,
      @code,
      @name,
      @date_mod,
      @user_mod,
      @active
      )
      
      DECLARE @IDENTITY INT = @@IDENTITY
      SELECT A.* FROM tbl_ad_fuel_type A 
      WHERE A.Id_fuel_type = @IDENTITY 
      SET IDENTITY_INSERT tbl_ad_fuel_type OFF
    COMMIT
    END TRY
    BEGIN CATCH
      ROLLBACK
      SET @MSG = ERROR_MESSAGE() + ' ERRLINE > ' + ERROR_LINE() + 'ERRNUMBER > ' + ERROR_NUMBER()
      RAISERROR(@MSG,18,0)
    END CATCH
  END
  
  IF ISNULL(@ACTION,'') = 'U'
  BEGIN
    UPDATE A SET
    A.code = @code,
    A.name = @name,
    A.date_mod = @date_mod,
    A.user_mod = @user_mod,
    A.active = @active
    FROM tbl_ad_fuel_type A
    WHERE A.Id_fuel_type = @Id_fuel_type
    
    SELECT A.* FROM tbl_ad_fuel_type A 
    WHERE A.Id_fuel_type = @Id_fuel_type
  END
  
  IF ISNULL(@ACTION,'') = 'D'
  BEGIN
    DELETE
    FROM tbl_ad_fuel_type
    WHERE Id_fuel_type = @Id_fuel_type
    
    SELECT @Id_fuel_type Id_fuel_type
  END
  
SET NOCOUNT OFF
